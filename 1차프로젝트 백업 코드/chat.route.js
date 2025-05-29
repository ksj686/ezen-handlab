import express from "express";
import { chatWithBot } from "../services/chat.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "메시지를 입력해주세요." });
  }

  try {
    const reply = await chatWithBot(message);
    res.json({ reply });
  } catch (err) {
    // console.error("Hugging Face API 오류:", err);
    // res.status(500).json({ error: "챗봇 응답 실패" });
    console.error("🧨 챗봇 호출 실패:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
