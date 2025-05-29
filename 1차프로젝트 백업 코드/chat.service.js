/* 무료버전 - credit 너무 적음
import OpenAI from "openai";

const client = new OpenAI({
  baseURL:
    "https://router.huggingface.co/hf-inference/models/CohereLabs/c4ai-command-r-plus-08-2024/v1", // ✅ Hugging Face Inference Router
  // "https://router.huggingface.co/nscale/v1",
  apiKey: process.env.HF_API_KEY, // 반드시 .env에 HF 키 있어야 함
});

let messageHistory = [
  {
    role: "system",
    content:
      "당신은 친절한 인터뷰 연습 챗봇입니다. 질문에 명확하고 부드럽게 답해주세요. 이 사이트의 기능은 직무/인성 면접을 도와줘 사용자가 면접에 자신감을 가지도록 도와주는 것입니다. markdown 문법은 적용되지 않으므로 plaintext로 답변하기.",
  },
];

export const chatWithBot = async (userMessage) => {
  try {
    console.log(messageHistory);
    messageHistory.push({
      role: "user",
      content: userMessage,
    });

    const chatCompletion = await client.chat.completions.create({
      model: "CohereLabs/c4ai-command-r-plus-08-2024", // ✅ HF에서 제공하는 OpenChat 모델
      // "Qwen/Qwen3-235B-A22B",
      messages: messageHistory,
    });

    const reply = chatCompletion.choices[0].message.content.trim();

    messageHistory.push({
      role: "assistant",
      content: reply,
    });

    return reply;
  } catch (error) {
    console.error("❌ Hugging Face Chat 호출 실패:", error.message);
    throw new Error("챗봇 응답 실패");
  }
};
*/

import OpenAI from "openai";

// 🔐 OpenAI API 키는 .env에 설정되어 있어야 함
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 반드시 .env에 있어야 함
});

export const chatWithBot = async (userMessage) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "너는 친절하고 도움이 되는 챗봇이야. 이 사이트의 기능은 사용자가 직무/인성 면접 준비를 원활하게 하도록 도와줘. 100자 이내로 답변해줘.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply = response.choices[0]?.message?.content?.trim();

    return reply || "죄송해요, 답변을 생성하지 못했어요.";
  } catch (error) {
    console.error("❌ OpenAI Chat 호출 실패:", error.message);
    throw new Error("챗봇 응답 실패");
  }
};

/* 쓸일 없을듯
import fetch from "node-fetch";

const HF_API_TOKEN = process.env.HF_API_KEY; // .env에 Hugging Face 키 저장

export const chatWithBot = async (message) => {
  const res = await fetch(
    "https://api-inference.huggingface.co/models/microsoft/DialoGPT-small", // 또는 mistralai/Mistral-7B-Instruct
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: message,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("🤖 HF 응답 오류:", res.status, text); // ✅ 에러 상세 출력
    throw new Error(`HF 응답 오류 (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.generated_text || "응답 없음";
};
*/
