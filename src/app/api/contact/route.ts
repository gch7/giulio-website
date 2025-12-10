import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const subjectLabels: Record<string, string> = {
      memberships: 'Discord Memberships',
      consulting: 'Consulting Services',
      general: 'General Inquiry',
    };

    const subjectLine = `[Gamma Capital] ${subjectLabels[subject] || 'New Contact'} from ${name}`;

    const { data, error } = await resend.emails.send({
      from: 'Gamma Capital <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'contact@gammacapital.com'],
      replyTo: email,
      subject: subjectLine,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-bottom: 2px solid #0d9488; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #0a0a0b; font-size: 24px; margin: 0;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f4f4f5; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0d9488;">${email}</a></p>
            <p style="margin: 0;"><strong>Topic:</strong> ${subjectLabels[subject] || 'Not specified'}</p>
          </div>
          
          <div style="background: #fff; border: 1px solid #e4e4e7; border-radius: 8px; padding: 20px;">
            <h2 style="color: #0a0a0b; font-size: 16px; margin: 0 0 10px 0;">Message:</h2>
            <p style="color: #52525b; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e4e4e7; text-align: center;">
            <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
              This email was sent from the Gamma Capital contact form.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
