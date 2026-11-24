'use client';

import { useState, type FormEvent } from 'react';

const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || '/api/waitlist';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'submitting' | 'joined';

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '');

    if (!EMAIL_RE.test(email)) {
      setError('Enter a valid email address, like you@example.com.');
      return;
    }

    setError(null);
    setStatus('submitting');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      });
      if (res.ok) {
        setStatus('joined');
        return;
      }
      setStatus('idle');
      if (res.status === 400) setError('Enter a valid email address, like you@example.com.');
      else if (res.status === 429) setError('Too many attempts. Please wait a minute and try again.');
      else setError('Something went wrong. Please try again.');
    } catch {
      setStatus('idle');
      setError('Something went wrong. Please check your connection and try again.');
    }
  }

  return (
    <div aria-live="polite">
      {status === 'joined' ? (
        <p className="mx-auto mt-10 inline-flex items-center gap-[10px] rounded-pill border border-border-strong bg-white px-6 py-4 text-[16px] font-medium text-brand">
          You’re on the list. We’ll be in touch before launch.
        </p>
      ) : (
        <form
          noValidate
          onSubmit={onSubmit}
          className="mx-auto mt-10 flex max-w-[560px] flex-wrap items-end justify-center gap-3 text-left"
        >
          <div className="flex flex-[1_1_300px] flex-col gap-2">
            <label htmlFor="wl-email" className="text-[14px] text-muted">
              Email address
            </label>
            <input
              id="wl-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'wl-error' : undefined}
              onInput={() => error && setError(null)}
              className={`box-border h-[54px] rounded-pill border bg-white px-[22px] font-sans text-[16px] text-ink ${
                error ? 'border-danger' : 'border-border-strong'
              }`}
            />
          </div>
          {/* Honeypot: hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
            <label htmlFor="wl-company">Company</label>
            <input id="wl-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            aria-busy={status === 'submitting'}
            className="btn-primary h-[54px] cursor-pointer rounded-pill border-none bg-brand px-7 font-sans text-[16px] font-medium text-white disabled:cursor-wait disabled:opacity-70"
          >
            Join the waitlist
          </button>
          {error && (
            <p id="wl-error" role="alert" className="m-0 basis-full px-[22px] text-[14px] leading-[1.5] text-danger">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
