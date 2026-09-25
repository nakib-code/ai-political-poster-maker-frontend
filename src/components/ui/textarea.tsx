import type { TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className = "",
  ...props
}: TextareaProps) {
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

      <textarea
        className={`form-textarea ${className}`}
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