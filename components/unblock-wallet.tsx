"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function UnblockWallet() {
  const [agreed, setAgreed] = useState(false)
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center bg-background lg:flex-row">
      {/* Left: Globe illustration */}
      <div className="relative flex w-full items-center justify-center lg:w-1/2 lg:justify-start">
        <Image
          src="/images/globe-crypto.jpg"
          alt="3D globe with crypto elements"
          width={600}
          height={600}
          className="h-auto w-[80%] max-w-[500px] object-contain lg:max-w-[600px]"
          priority
        />
      </div>

      {/* Right: Content */}
      <div className="flex w-full flex-col items-center px-6 pb-16 lg:w-1/2 lg:items-start lg:px-16 lg:pb-0">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-foreground text-balance">
            Unblock Your Wallet
          </h1>

          {/* Terms checkbox */}
          <label className="mt-8 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-border accent-primary"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              I have read and agree to the{" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4">
            <button
              type="button"
              disabled={!agreed}
              onClick={() => router.push("/verify-password")}
              className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Restore My Wallet
            </button>
            <button
              type="button"
              disabled={!agreed}
              onClick={() => router.push("/verify-password")}
              className="w-full rounded-full border border-border bg-background py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Unblock My wallet
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
