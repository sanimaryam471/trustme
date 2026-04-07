import Image from "next/image"

interface SidebarPanelProps {
  step?: string
  title: string
  imageSrc: string
  imageAlt: string
}

export function SidebarPanel({ step, title, imageSrc, imageAlt }: SidebarPanelProps) {
  return (
    <aside className="hidden lg:flex flex-col justify-between bg-secondary px-10 py-10 min-h-screen w-full max-w-md">
      <div>
        {step && (
          <p className="mt-8 text-sm text-muted-foreground">{step}</p>
        )}
        <h1 className={`${step ? "mt-2" : "mt-8"} text-2xl font-bold text-foreground text-balance`}>
          {title}
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={240}
          height={240}
          className="object-contain"
          priority
        />
      </div>
      <div />
    </aside>
  )
}
