import type { LabelHTMLAttributes } from "react";

interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

export default function Label({
  children,
  className = "",
  ...props
}: LabelProps) {
  return (
    <label
      className={`form-label ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}