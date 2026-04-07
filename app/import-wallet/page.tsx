import { SidebarPanel } from "@/components/sidebar-panel"
import { ImportWalletForm } from "@/components/import-wallet-form"

export default function ImportWalletPage() {
  return (
    <main className="flex min-h-screen bg-card">
      <SidebarPanel
        title="Import a wallet"
        imageSrc="/images/laptop-wallet.jpg"
        imageAlt="Laptop showing crypto charts with connected hardware wallet"
      />
      <ImportWalletForm />
    </main>
  )
}
