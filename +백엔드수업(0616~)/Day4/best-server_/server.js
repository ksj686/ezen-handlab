const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/docs/swaggerConfig");

//라우터 가져오기
const indexRouter = require("./src/routes/indexRouter");
const postRouter = require("./src/routes/postRouter");
const userRouter = require("./src/routes/userRouter");
const adminRouter = require("./src/routes/adminRouter");
const loginRouter = require("./src/routes/loginRouter");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("./src/middlewares/verifyMiddleware");

const port = process.env.PORT || 7777;

const app = express();

//미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(cors()); //react와 통신하려면 필요한 미들웨어

//라우터와 연결
app.use("/", indexRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", verifyAccessToken, verifyAdmin, adminRouter); // admin은 항상 admin 계정인지 체크해야하기 때문에 router보단 server.js에서 추가하는게 효율적일수도
app.use("/api/auth", loginRouter);

// Swagger UI 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger 정적 문서 설정
// const swaggerDocument = require("./src/docs/swagger.json");
// app.use("/api-json", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//서버가동
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
