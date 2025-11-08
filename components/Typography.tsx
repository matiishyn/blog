import { ReactNode } from "react";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  className?: string;
}

export default function Typography({
  variant = "h2",
  children,
  className = "",
}: TypographyProps) {
  const baseClasses = "font-heading text-heading";

  const variantClasses = {
    h1: "text-5xl font-bold",
    h2: "text-4xl font-bold",
    h3: "text-3xl font-semibold",
    h4: "text-2xl font-semibold",
    h5: "text-xl font-medium",
    h6: "text-lg font-medium",
  };

  const Tag = variant;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return <Tag className={classes}>{children}</Tag>;
}

