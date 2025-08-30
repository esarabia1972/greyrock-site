import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // ✅ Verde por defecto (y con ! para no ser pisado)
        default: "!bg-green-600 !text-white hover:!bg-green-700 focus-visible:!ring-green-600",
        // ✅ Alias: primary también es verde (por compatibilidad con CTAs existentes)
        primary: "!bg-green-600 !text-white hover:!bg-green-700 focus-visible:!ring-green-600",
        // ◻️ Botón claro disponible cuando lo pidas explícito
        light: "!bg-white !text-gray-900 !border !border-gray-200 hover:!bg-gray-50",
        secondary: "!bg-gray-100 !text-gray-900 hover:!bg-gray-200",
        outline: "!border !border-gray-300 !text-gray-900 hover:!bg-gray-50",
        ghost: "hover:!bg-gray-100 !text-gray-900",
        link: "!text-gray-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    // 🔥 default = verde
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    // className primero, variantes al final => las variantes GANAN
    return (
      <Comp
        className={cn(className, buttonVariants({ variant, size }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
