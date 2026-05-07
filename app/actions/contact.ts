'use server';

import { Resend } from 'resend';

export type ContactFormState = {
  success: boolean;
  message: string;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
};

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  // Validate
  const errors: ContactFormState['errors'] = {};

  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message || message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: 'Please fix the errors below.', errors };
  }

  // Send email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return {
      success: true,
      message: "Message sent! I'll get back to you soon.",
      errors: {},
    };
  } catch {
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
      errors: {},
    };
  }
}
