import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* Boutons HANA : arrondi complet, ton chaleureux.
   - default      : terracotta (action principale)
   - ambre        : accent premium (mise en avant, offres)
   - outline      : contour espresso sur fonds clairs
   - outlineLight : contour crème pour les sections espresso */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-terracotta text-creme shadow hover:bg-terracotta-dark",
        ambre:
          "bg-ambre text-espresso shadow hover:bg-ambre-light",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-espresso/25 bg-transparent text-espresso shadow-sm hover:border-espresso/50 hover:bg-espresso/5",
        outlineLight:
          "border border-creme/40 bg-transparent text-creme shadow-sm hover:border-creme hover:bg-creme/10",
        secondary:
          "bg-sauge text-creme shadow-sm hover:bg-sauge-dark",
        ghost: "hover:bg-espresso/5 hover:text-espresso",
        link: "text-terracotta underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
