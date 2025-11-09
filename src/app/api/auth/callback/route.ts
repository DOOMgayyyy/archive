import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) return NextResponse.json({ error: "No code provided" });

  const client_id = process.env.VK_CLIENT_ID!;
  const client_secret = process.env.VK_CLIENT_SECRET!;
  const redirect_uri = process.env.VK_REDIRECT_URI!;

  // Обмен кода на access_token
  const tokenRes = await fetch(
    `https://oauth.vk.com/access_token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}`
  );
  const tokenData = await tokenRes.json();

  // tokenData содержит access_token, user_id и email
  // Сохрани данные в сессии или в базе
  return NextResponse.json(tokenData);
}
