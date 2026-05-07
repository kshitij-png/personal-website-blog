'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { sendContactEmail, type ContactFormState } from '@/app/actions/contact';

const initialState: ContactFormState = {
  success: false,
  message: '',
  errors: {},
};
import { useEffect, useState } from 'react';

const inputClass =
  'px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}

export default function ContactPage() {
  const [state, action] = useFormState(sendContactEmail, initialState);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (state.success) {
      setShowToast(true);
      const t = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(t);
    }
  }, [state]);

  return (
    <>
      {/* Toast */}
      <div
        className={`fixed top-4 right-4 z-50 px-5 py-3 bg-primary text-white text-sm font-medium rounded-lg shadow-lg transition-all duration-300 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {state.message}
      </div>

      <div className="max-w-xl mx-auto py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Get in Touch</h1>
        <p className="text-muted mb-10">
          Have a question or want to work together? Send me a message.
        </p>

        {/* General error banner */}
        {!state.success && state.message ? (
          <div className="mb-6 p-4 rounded-lg border text-sm" style={{ backgroundColor: 'var(--subtle)', borderColor: 'var(--border)', color: 'var(--foreground)' }}>
            {state.message}
          </div>
        ) : null}

        <form action={action} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className={inputClass}
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-500">{state.errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className={inputClass}
            />
            {state?.errors?.email && (
              <p className="text-sm text-red-500">{state.errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="What's on your mind?"
              className={`${inputClass} resize-none`}
            />
            {state?.errors?.message && (
              <p className="text-sm text-red-500">{state.errors.message}</p>
            )}
          </div>

          <SubmitButton />
        </form>
      </div>
    </>
  );
}
