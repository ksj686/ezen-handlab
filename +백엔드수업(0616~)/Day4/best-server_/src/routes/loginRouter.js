const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const verifyMiddleware = require("../middlewares/verifyMiddleware");

// '/api/auth'

router.post("/login", loginController.login);

router.post("/logout", loginController.logout);

router.post("/refresh", loginController.refreshVerify);

router.get(
  "/user",
  verifyMiddleware.verifyAccessToken,
  loginController.getAuthenticUser
);

router.get(
  "/mypage",
  verifyMiddleware.verifyAccessToken,
  loginController.mypage
); // 로그인한 사용자만 이용 가능

module.exports = router;
