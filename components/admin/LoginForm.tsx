"use client";

import { useActionState } from "react";
import { signInAction, type ActionState } from "@/app/admin/actions";

export default function LoginForm({ disabled }: { disabled?: boolean }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(signInAction, { ok: true });
  return (
    <form action={action} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="block text-[13.5px] font-medium text-ink">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required className="admin-input mt-1.5" />
      </div>
      <div>
        <label htmlFor="password" className="block text-[13.5px] font-medium text-ink">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="admin-input mt-1.5" />
      </div>
      {state.message ? (
        <p role="alert" className="text-[13.5px] text-red-700">{state.message}</p>
      ) : null}
      <button type="submit" disabled={pending || disabled} className="btn-primary w-full !rounded-[12px]">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
