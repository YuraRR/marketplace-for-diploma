import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "h-[50px] shadow-xs hover:bg-primary/90 ",
        destructive:
          "bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[50px] px-6 py-4 has-[>svg]:px-3",
        xs: "h-[34px] max-w-[89px] gap-1.5 px-3 has-[>svg]:px-2.5",
        sm: "h-[40px] gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "max-w-[150px] gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "max-w-[180px] px-6 has-[>svg]:px-4",
        xl: "max-w-[198px] px-8 has-[>svg]:px-6 text-lg",
        icon: "size-9",
      },
      color: {
        green: "bg-light-green hover:bg-green-700 text-white",
        darkGray: "bg-gray-800 hover:bg-gray-700 text-white",
        white: "bg-white hover:bg-gray-100 text-black ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  color,
  asChild = false,
  iconBefore,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    iconBefore?: IconDefinition;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp data-slot="button" className={cn(buttonVariants({ size, color, variant, className }))} {...props}>
      {iconBefore && <FontAwesomeIcon icon={iconBefore} />}

      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
