import React, { useState } from "react";
import GenericButton from "../Button";

type Field = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
};

type GenericFormProps = {
  fields: Field[];
  submitLabel?: React.ReactNode;
  variant?: "login" | "secondary" | "danger";
  className?: string;
  method: "POST" | "GET";
  onSubmit?: (values: Record<string, string>) => void;
};

const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  submitLabel = "Enviar",
  variant,
  method,
  onSubmit,
  className,
}) => {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach(({ name, defaultValue }) => {
      initial[name] = defaultValue || "";
    });
    return initial;
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <form method={method} onSubmit={handleSubmit} className={className}>
      {fields.map(({ name, label, type = "text", placeholder, required }) => (
        <div key={name} className="form-group">
          {label && (
            <label htmlFor={name} className="form-label">
              {label}
            </label>
          )}
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            value={values[name]}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      ))}

      <GenericButton variant={variant} type="submit">
        {submitLabel}
      </GenericButton>
    </form>
  );
};

export default GenericForm;
