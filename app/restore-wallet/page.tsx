import { SidebarPanel } from "@/components/sidebar-panel"
import { RestoreWalletForm } from "@/components/restore-wallet-form"

export default function RestoreWalletPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarPanel
        title="Import a wallet"
        imageSrc="/images/laptop-wallet.jpg"
        imageAlt="Laptop with crypto trading charts"
      />
      <RestoreWalletForm />
    </div>
  )
}
