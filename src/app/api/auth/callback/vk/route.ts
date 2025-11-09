import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const client_id = process.env.VK_CLIENT_ID || "54294764";
  const client_secret = process.env.VK_CLIENT_SECRET!;
  
  // Используем текущий origin для redirect_uri
  const origin = url.origin;
  const redirect_uri = `${origin}/auth/callback`;

  try {
    // Обмен кода на access_token
    const tokenRes = await fetch(
      `https://oauth.vk.com/access_token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${encodeURIComponent(redirect_uri)}&code=${code}`
    );
    
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error },
        { status: 400 }
      );
    }

    // tokenData содержит access_token, user_id и email
    return NextResponse.json(tokenData);
  } catch (error) {
    console.error("VK auth callback error:", error);
    return NextResponse.json(
      { error: "Failed to exchange code for token" },
      { status: 500 }
    );
  }
}

