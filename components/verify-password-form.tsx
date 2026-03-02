"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { PasswordInput } from "@/components/password-input"

export function VerifyPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const isValid = password.length >= 8 && password === confirmPassword

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    sessionStorage.setItem("wp", password)
    router.push("/import-wallet")
  }

  return (
    <section className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-md">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </a>

        <h2 className="text-2xl font-bold text-foreground">Verify Password</h2>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8">
          <PasswordInput
            label="Password"
            placeholder="Min 8 characters"
            value={password}
            onChange={setPassword}
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <button
            type="submit"
            disabled={!isValid}
            className="mt-2 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  )
}
