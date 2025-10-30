import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function fetchDrakeNews(): Promise<string> {
  const key = process.env.NEWSAPI_KEY;
  if (!key) return "";
  const url = new URL("https://newsapi.org/v2/everything");
  url.searchParams.set("q", "Drake");
  url.searchParams.set("language", "en");
  url.searchParams.set("sortBy", "publishedAt");
  url.searchParams.set("pageSize", "5");

  try {
    const res = await fetch(url.toString(), {
      headers: { "X-Api-Key": key },
      // next: { revalidate: 60 }, // uncomment to cache for 60s
    });
    if (!res.ok) return "";
    const data = await res.json();
    const articles = (data?.articles ?? []) as Array<{
      title?: string;
      description?: string;
      url?: string;
      source?: { name?: string };
    }>;

    const lines = articles.map((a, i) =>
      `(${i + 1}) ${a.title ?? "Untitled"} — ${a.source?.name ?? "Unknown"}${
        a.url ? ` | ${a.url}` : ""
      }${a.description ? `\n    ${a.description}` : ""}`
    );
    return lines.length ? `Recent Drake-related news:\n${lines.join("\n")}` : "";
  } catch {
    return "";
  }
}

export async function POST(req: Request) {
  try {
    if (!client.apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY on server" },
        { status: 500 }
      );
    }

    const { message } = (await req.json()) as { message?: string };
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    const newsContext = await fetchDrakeNews();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Drake (the rapper). Speak in his tone—charismatic, warm, witty. Be concise and positive. Avoid claiming private schedules or unknown real-world info. If the user makes any mention or request for recent things you (as Drake) has been doing, use the newContext information" +
            (newsContext ? `\n\n${newsContext}` : "")
        },
        { role: "user", content: message }
    
    ],
    });

    const reply = completion.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}


