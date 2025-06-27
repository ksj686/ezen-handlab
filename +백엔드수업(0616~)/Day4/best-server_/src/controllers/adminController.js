// adminController.js
const prisma = require("../utils/prisma");
const pool = require("../models/dbPool");

exports.listUser = async (req, res) => {
  try {
    console.log("==========adminController=============");

    const sql = `select id, name, email, role,
                date_format(indate,'%Y-%m-%d %H:%i:%s') as indate
                from members order by id desc`;
    const [result] = await pool.query(sql);
    res.status(200).json(result);

    // prisma => 잘 작동함
    /*
    const result = await prisma.members.findMany({
      orderBy: {
        id: "desc",
      },
    });

    // passwd 제거 + 날짜 포맷
    const sanitizedResult = result.map(({ passwd, ...rest }) => ({
      ...rest,
      indate: rest.indate
        ? rest.indate.toISOString().replace("T", " ").slice(0, 19)
        : null,
    }));

    res.status(200).json(sanitizedResult);
    */
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
};
