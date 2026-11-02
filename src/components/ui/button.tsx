import Link from "next/link";
import { cn } from "@/lib/utils";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

const variantStyles = {
  primary: "bg-brand-primary text-brand-dark hover:bg-brand-primary-hover",
  secondary:
    "bg-transparent border border-brand-link/40 text-brand-link hover:bg-brand-link/5 hover:border-brand-link",
  ghost: "bg-transparent text-foreground hover:text-brand-link",
};

const sizeStyles = {
  md: "px-5 py-2 text-sm",
  lg: "px-7 py-3 text-[17px]",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    href,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer whitespace-nowrap",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
