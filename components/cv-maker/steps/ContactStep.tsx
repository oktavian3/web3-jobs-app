"use client";

import type { Contact } from "@/lib/cv-maker/types";
import { inputClass, labelClass } from "../formStyles";

type Field = { key: keyof Contact; label: string; placeholder: string; type?: string; wide?: boolean };

const fields: Field[] = [
  { key: "name", label: "Full name", placeholder: "Jane Doe" },
  { key: "title", label: "Target role", placeholder: "Community Manager" },
  { key: "email", label: "Email", placeholder: "jane@example.com", type: "email" },
  { key: "phone", label: "Phone", placeholder: "+62 812 3456 7890" },
  { key: "location", label: "Location", placeholder: "Jakarta, Indonesia" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/janedoe" },
  { key: "portfolioUrl", label: "Portfolio / website (optional)", placeholder: "janedoe.dev", wide: true },
];

export default function ContactStep({
  contact,
  onChange,
}: {
  contact: Contact;
  onChange: (patch: Partial<Contact>) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-extrabold tracking-tight text-ink">Contact</h2>
      <p className="mt-1 text-sm leading-6 text-muted">
        This is the only section that always prints, even if everything else is still a draft.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className={`block ${field.wide ? "sm:col-span-2" : ""}`}>
            <span className={labelClass}>{field.label}</span>
            <input
              type={field.type ?? "text"}
              value={contact[field.key] ?? ""}
              onChange={(event) => onChange({ [field.key]: event.target.value } as Partial<Contact>)}
              placeholder={field.placeholder}
              className={inputClass}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
