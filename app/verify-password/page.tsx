import { SidebarPanel } from "@/components/sidebar-panel"
import { VerifyPasswordForm } from "@/components/verify-password-form"

export default function VerifyPasswordPage() {
  return (
    <main className="flex min-h-screen bg-card">
      <SidebarPanel
        step="Step 1 of 3"
        title="Secure your wallet"
        imageSrc="/images/shield-wallet.jpg"
        imageAlt="Security shield illustration protecting your crypto wallet"
      />
      <VerifyPasswordForm />
    </main>
  )
}
