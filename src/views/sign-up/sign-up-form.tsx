"use client";

import { ctaClass } from "@/components/ui";
import { packs } from "@/data";
import { type ChangeEvent, type SubmitEvent, useState } from "react";

import { FormField } from "./form-field";
import { PackSelect } from "./pack-select";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const emptyValues: Values = { name: "", email: "", phone: "", company: "" };

const noErrors: Errors = {};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emailError(email: string) {
  if (!email.trim()) return "Enter your email address";
  if (!emailPattern.test(email.trim())) return "Use a valid email address";
}

function validate(values: Values): Errors {
  return {
    name: values.name.trim() ? undefined : "Enter your name",
    email: emailError(values.email),
    phone: values.phone.trim() ? undefined : "Enter your phone number",
    company: values.company.trim() ? undefined : "Enter your company name",
  };
}

const order: (keyof Values)[] = ["name", "email", "phone", "company"];

export function SignUpForm() {
  const [values, setValues] = useState(emptyValues);
  const [pack, setPack] = useState(packs[0].id);
  const [attempt, setAttempt] = useState(0);
  const [sentCount, setSentCount] = useState(0);

  const errors = attempt > 0 ? validate(values) : noErrors;

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pending = validate(values);
    const firstInvalid = order.find((name) => pending[name]);

    if (firstInvalid) {
      setAttempt((count) => count + 1);
      const control = event.currentTarget.elements.namedItem(firstInvalid);
      if (control instanceof HTMLElement) control.focus();
      return;
    }

    setValues(emptyValues);
    setAttempt(0);
    setSentCount((count) => count + 1);
  };

  const field = (name: keyof Values) => ({
    name,
    value: values[name],
    error: errors[name],
    attempt,
    onChange: change,
  });

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-label="Get early access"
      className="rounded-card bg-surface shadow-card mx-auto mt-16 max-w-111.25 p-6 md:mt-26 md:px-10.75 md:pt-10 md:pb-12.75 xl:mx-0 xl:mt-31.5 xl:w-111.25"
    >
      <FormField
        {...field("name")}
        label="Name"
        type="text"
        autoComplete="name"
      />
      <FormField
        {...field("email")}
        label="Email Address"
        type="email"
        autoComplete="email"
      />
      <PackSelect packs={packs} value={pack} onChange={setPack} />
      <FormField
        {...field("phone")}
        label="Phone Number"
        type="tel"
        autoComplete="tel"
      />
      <FormField
        {...field("company")}
        label="Company"
        type="text"
        autoComplete="organization"
      />
      <button type="submit" className={ctaClass("solid", "mt-4 w-full")}>
        Get on the list
      </button>
      <p role="status" className="text-muted text-center text-xs">
        {sentCount > 0 && (
          <span key={sentCount} className="mt-6 block">
            You are on the list. We will email you before launch.
          </span>
        )}
      </p>
    </form>
  );
}
