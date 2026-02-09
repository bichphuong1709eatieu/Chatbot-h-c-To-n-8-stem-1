
import { GoogleGenAI } from "@google/genai";

export async function getTutorResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  // Sử dụng API_KEY từ môi trường hệ thống
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return "Thầy đang bảo trì bộ não một chút, con quay lại sau nhé!";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    Bạn là 'Thầy Pi' - Chatbot gia sư Toán 8 chuyên về 7 hằng đẳng thức.
    PHONG CÁCH: 
    - Trả lời cực kỳ ngắn gọn, súc tích (dưới 3 câu nếu có thể).
    - Ngôn ngữ Gen Z nhẹ nhàng, thân thiện (con - thầy).
    - Đi thẳng vào trọng tâm câu hỏi.
    
    QUY TẮC TOÁN HỌC:
    - BẮT BUỘC dùng dấu $ để bọc công thức. Ví dụ: $(a+b)^2 = a^2 + 2ab + b^2$.
    - Luôn kèm theo 1 ví dụ siêu ngắn nếu học sinh hỏi về công thức.
    
    VÍ DỤ TRẢ LỜI:
    User: HĐT số 3 là gì thầy?
    Model: Là Hiệu hai bình phương: $a^2 - b^2 = (a-b)(a+b)$. Ví dụ: $x^2 - 4 = (x-2)(x+2)$. Dễ đúng không con?
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    return response.text || "Thầy chưa nghe rõ, con nói lại nhé!";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return "Hệ thống đang bận, con chờ thầy tí nhé!";
  }
}

// Giữ lại các hàm cũ để không làm lỗi các file khác nhưng không dùng đến logic lưu key nữa
export function hasStoredApiKey(): boolean { return true; }
export function getStoredApiKey(): string { return ""; }
export function setStoredApiKey(key: string) { }
