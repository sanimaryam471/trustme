"use client"

import { ChevronLeft, ChevronRight, Smartphone, Cpu } from "lucide-react"
import Link from "next/link"

interface WalletOption {
  icon: React.ReactNode
  label: string
  href: string
}

function WalletRow({ icon, label, href }: WalletOption) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl bg-secondary px-5 py-4 transition-colors hover:bg-secondary/70"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-foreground" />
    </Link>
  )
}

export function ImportWalletForm() {
  return (
    <section className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-lg">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        <h2 className="text-2xl font-bold text-foreground">
          Select your existing wallet
        </h2>

        <div className="mt-10 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <WalletRow
              icon={
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
                  <Smartphone className="h-4 w-4 text-primary" />
                </div>
              }
              label="Wallet Mobile"
              href="/restore-wallet"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-muted-foreground">
              Hardware wallets
            </p>
            <WalletRow
              icon={
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
                  <Cpu className="h-4 w-4 text-primary" />
                </div>
              }
              label="Hardware Wallet"
              href="/import-wallet"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
