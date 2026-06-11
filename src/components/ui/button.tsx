"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85a0ff]/70",
  {
    variants: {
      variant: {
        default:
          "border border-[#6f8dff]/40 bg-[#4264ff] text-white shadow-[0_10px_28px_rgba(66,100,255,0.32)] hover:bg-[#3450d6]",
        outline:
          "border border-white/14 bg-white/[0.04] text-white hover:border-white/24 hover:bg-white/[0.09]",
        ghost: "text-white/70 hover:bg-white/[0.07] hover:text-white",
        secondary:
          "border border-white/10 bg-white text-[#172250] hover:bg-[#eef2ff]",
        link: "h-auto rounded-none p-0 text-[#bcccff] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-5",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
