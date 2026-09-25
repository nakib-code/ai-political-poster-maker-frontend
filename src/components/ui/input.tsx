import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="form-group">
      {label && (
        <label
          htmlFor={props.id}
          className="form-label"
        >
          {label}
        </label>
      )}

      <input
        className={`form-input ${className}`}
        {...props}
      />

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}