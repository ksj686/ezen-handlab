const pool = require("../models/dbPool");
// npm i jsonwebtoken
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JWT 토큰 생성하는 함수
const generateToken = (user, secret, expires) => {
  return jwt.sign(user, secret, { expiresIn: expires });
};

exports.login = async (req, res) => {
  const { email, passwd } = req.body;
  console.log(`email: ${email}, passwd: ${passwd}`);
  try {
    // 1. DB members 에서 email로 회원정보 가져오기
    const sql = `select id, name, email, passwd, role 
                    from members where email=?`;
    const [result] = await pool.query(sql, [email]);
    if (result.length === 0)
      return res.status(401).json({
        result: "fail",
        message: "아이디 또는 비밀번호가 일치하지 않습니다",
      });

    const user = result[0]; // 회원정보 꺼내기

    // 2. 비번 일치 여부 체크 - bcrypt로 compare()
    const isMatch = await bcrypt.compare(passwd, user.passwd);
    //   사용자가 입력한 비번:passwd, DB에서 가져온 암호화된 비번: user.passwd
    console.log("isMatch: ", isMatch);
    if (!isMatch) {
      return res
        .status(401)
        .json({ result: "fail", message: "아이디 또는 비밀번호를 확인하세요" });
    }
    //   3. 회원으로 인증받은 경우 ==> accessToken 과 refreshToken 생성
    const { passwd: _, ...userPayload } = user; // 안받을 데이터들은 _로 설정
    //   데이터를 두개 이상 _ 로 설정하면 에러발생
    console.log(passwd, userPayload);

    //   accessToken: 15분 설정, refreshToken: 1h

    const accessToken = generateToken(
      userPayload,
      process.env.ACCESS_SECRET,
      "15m"
    );
    const refreshToken = generateToken(
      userPayload,
      process.env.REFRESH_SECRET,
      "1h"
    );

    console.log("accessToken: ", accessToken);
    console.log("refreshToken: ", refreshToken);

    //   4. members 테이블에 refreshToken 값을 수정해야함
    const sql2 = `update members set refreshtoken=? where id=?`;

    await pool.query(sql2, [refreshToken, user.id]);

    res.json({
      result: "success",
      message: "로그인 성공!!",
      data: { accessToken, refreshToken, ...userPayload },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "fail", message: "회원인증실패" });
  }
}; // login----------------------

exports.logout = async (req, res) => {
  const { email } = req.body;
  //refreshtoken값을 null로 설정
  if (!email) {
    return res
      .status(400)
      .json({ result: "fail", message: "유효하지 않은 사용자입니다" });
  }
  try {
    const sql = `update members set refreshtoken =null where email=?`;
    const [result] = await pool.query(sql, [email]);
    if (result.affectedRows === 0)
      return res
        .status(400)
        .json({ result: "fail", message: "유효하지 않은 사용자입니다" });
    res.json({ result: "success", message: "로그아웃 처리 되었습니다" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "fail",
      message: "DB Error-로그아웃 처리 중 에러: " + error,
    });
  }
}; // logout----------------------

exports.refreshVerify = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "refreshToken이 없습니다" });
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
    //
    if (err) {
      // 유효하지 않은 토큰일 경우
      return res
        .status(403)
        .json({ message: "유효하지 않은 refreshToken 입니다" });
    }

    // 인증된 토큰일 경우 => DB members 테이블에서 refreshToken으로 회원정보 가져오기
    const sql = `select id, name, email, role from members where refreshtoken=?`;
    const [result] = await pool.query(sql, [refreshToken]);
    if (result.length === 0) {
      return res.status(403).json({ message: "인증받지 않은 회원입니다." });
    }
    const user = result[0];

    // 새로운 accessToken 발급
    const newAccessToken = generateToken(
      user,
      process.env.ACCESS_SECRET,
      "15m"
    );
    res.json({ accessToken: newAccessToken });
  });
}; // refreshVerify----------------------

exports.getAuthenticUser = async (req, res) => {
  res.json(req.authUser);
};

exports.mypage = async (req, res) => {
  try {
    console.log("=================" + req.authUser);

    if (!req.authUser)
      return res
        .status(404)
        .json({ result: "fail", message: "로그인해야 이용 가능해요" });
    const id = req.authUser.id;
    const sql = `select * from members where id=?`;
    const [result] = await pool.query(sql, [id]);
    if (result.length === 0) {
      return res.json({ result: "fail", message: "회원이 아닙니다" });
    }
    const { passwd: _, ...userData } = result[0];
    return res.status(200).json({
      result: "success",
      message: `${userData.name}님의 MyPage입니다`,
      data: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "fail", message: "DB Error: " + error });
  }
};
