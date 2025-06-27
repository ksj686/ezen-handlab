/**
 * @swagger
 * tags:
 *   name: User
 *   description: 사용자 관련 API
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: 관리자 관련 API
 */

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: 포스트 관련 API
 */

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: 로그인 관련 API
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 모든 사용자 목록 조회
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 사용자 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/auth/login:
 *   get:
 *     summary: login
 *     tags: [Login]
 *     description: login
 *     responses:
 *       200:
 *         description: login
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Admin - Get all users
 *     tags: [Admin]
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           description: 사용자 ID
 *         name:
 *           type: string
 *           description: 사용자 이름
 *         email:
 *           type: string
 *           description: 사용자 이메일
 *         role:
 *           type: string
 *           description: 사용자 역할
 *         indate:
 *           type: string
 *           format: date-time
 *           description: 가입일시
 */
