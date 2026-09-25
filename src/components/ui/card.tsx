import type { HTMLAttributes } from "react";

interface CardProps
  extends HTMLAttributes<HTMLDivElement> {
  soft?: boolean;
  hover?: boolean;
}

export default function Card({
  soft = false,
  hover = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`${soft ? "card-soft" : "card"} ${
        hover ? "card-hover" : ""
      } ${className}`}
      {...props}
    />
  );
}