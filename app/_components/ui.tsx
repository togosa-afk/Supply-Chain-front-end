import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

type ButtonVariant = "primary" | "secondary" | "quiet";
type ButtonSize = "small" | "medium";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "medium",
  loading = false,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={`ui-button ui-button--${variant} ui-button--${size} ${className}`.trim()}
      disabled={disabled || loading}
    >
      {loading && <span className="ui-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}

type FieldFrameProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

function FieldFrame({
  id,
  label,
  hint,
  error,
  required,
  children,
}: FieldFrameProps) {
  return (
    <div className="ui-field">
      <label className="ui-label" htmlFor={id}>
        {label}
        {required && (
          <span className="ui-required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && (
        <span className="ui-field-hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      {error && (
        <span className="ui-field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> &
  Omit<FieldFrameProps, "children"> & {
    id: string;
  };

export function TextField({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  ...props
}: TextFieldProps) {
  const describedBy = [
    hint ? `${id}-hint` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FieldFrame
      error={error}
      hint={hint}
      id={id}
      label={label}
      required={required}
    >
      <input
        {...props}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        className={`ui-input ${className}`.trim()}
        id={id}
        required={required}
      />
    </FieldFrame>
  );
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> &
  Omit<FieldFrameProps, "children"> & {
    id: string;
    children: ReactNode;
  };

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  children,
  ...props
}: SelectFieldProps) {
  const describedBy = [
    hint ? `${id}-hint` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FieldFrame
      error={error}
      hint={hint}
      id={id}
      label={label}
      required={required}
    >
      <select
        {...props}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        className={`ui-input ui-select ${className}`.trim()}
        id={id}
        required={required}
      >
        {children}
      </select>
    </FieldFrame>
  );
}

type BadgeTone = "neutral" | "info" | "success" | "warning" | "error";

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: BadgeTone;
  children: ReactNode;
}) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>;
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`ui-panel ${className}`.trim()}>{children}</section>;
}

export function StatusMessage({
  type,
  children,
}: {
  type: "success" | "error";
  children: ReactNode;
}) {
  return (
    <p
      aria-live="polite"
      className={`ui-status ui-status--${type}`}
      role={type === "error" ? "alert" : "status"}
    >
      <span aria-hidden="true">{type === "error" ? "!" : "✓"}</span>
      {children}
    </p>
  );
}
