var express = require("express");
var router = express.Router();
const users = require("../controller/users.controller");
const { auth } = require("../middleware/authmiddleware");

// 도메인/api/users/ 주소
router.post("/login", users.login);
router.get("/agree", users.agreePosts);
router.get("/posts", users.getPosts);
router.get("/:username", users.findByID);
router.post("/register", users.create);
router.put("/modify", users.update);
router.delete("/delete", users.delete);

// 토큰을 검증하는 엔드포인트
router.get("/auth/payload", auth, (req, res) => {
  const username = req.decoded.username;
  console.log(req.decoded);
  return res.status(200).json({
    code: 200,
    message: "토큰이 정상입니다.",
    data: {
      username: username,
    },
  });
});

module.exports = router;
