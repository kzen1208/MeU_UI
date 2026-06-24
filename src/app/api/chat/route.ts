import { openrouter } from "@/lib/openrouter";

const SYSTEM_PROMPT = {
  vi: "Bạn là trợ lý của MeU UI Hub, một design system và component hub. Trả lời ngắn gọn, thân thiện, tập trung vào component, template và cách dùng UI Hub.",
  en: "You are the assistant for MeU UI Hub, a design system and component hub. Answer concisely and stay focused on the hub's components, templates, and usage.",
};

export async function POST(request: Request) {
  const { messages, language } = await request.json();

  try {
    const completion = await openrouter.chat.completions.create({
      model: "openrouter/owl-alpha",
      messages: [
        { role: "system", content: SYSTEM_PROMPT[language === "vi" ? "vi" : "en"] },
        ...messages,
      ],
    });

    return Response.json({ reply: completion.choices[0]?.message?.content ?? "" });
  } catch (error) {
    console.error("OpenRouter request failed", error);
    return Response.json({ error: "AI request failed" }, { status: 502 });
  }
}
