"use server";

import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

export async function sendPublicSupportMessage(
  formData: FormData
) {
  const name = String(formData.get("name") || "").trim();

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const category = String(
    formData.get("category") || ""
  ).trim();

  const subject = String(
    formData.get("subject") || ""
  ).trim();

  const message = String(
    formData.get("message") || ""
  ).trim();

  /* =====================================================
     VALIDATION
  ===================================================== */

  if (!name) {
    redirect(
      "/support?error=Please%20enter%20your%20name."
    );
  }

  if (!email) {
    redirect(
      "/support?error=Please%20enter%20your%20email."
    );
  }

  if (!category) {
    redirect(
      "/support?error=Please%20select%20a%20category."
    );
  }

  if (!subject) {
    redirect(
      "/support?error=Please%20enter%20a%20subject."
    );
  }

  if (!message) {
    redirect(
      "/support?error=Please%20describe%20your%20problem."
    );
  }

  if (message.length < 10) {
    redirect(
      "/support?error=Please%20provide%20a%20little%20more%20detail."
    );
  }

  /* =====================================================
     SMTP
  ===================================================== */

  const smtpHost = process.env.SMTP_HOST;

  const smtpPort = Number(
    process.env.SMTP_PORT || 465
  );

  const smtpUser = process.env.SMTP_USER;

  const smtpPassword =
    process.env.SMTP_PASSWORD;

  const supportEmail =
    process.env.SUPPORT_EMAIL;

  if (
    !smtpHost ||
    !smtpUser ||
    !smtpPassword ||
    !supportEmail
  ) {
    console.error(
      "Support email environment variables are missing."
    );

    redirect(
      "/support?error=Support%20email%20is%20not%20configured."
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,

    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  /* =====================================================
     SUPPORT EMAIL
  ===================================================== */

  const supportSubject =
    `[NutriTrack AI Public Support] ${category} - ${subject}`;

  const supportText = `
New public support request from NutriTrack AI

----------------------------------------
CONTACT INFORMATION
----------------------------------------

Name: ${name}
Email: ${email}

----------------------------------------
REQUEST
----------------------------------------

Category: ${category}

Subject: ${subject}

Message:

${message}

----------------------------------------
Sent from NutriTrack AI Public Support
`;

  try {
    /* -----------------------------------------------
       Email to support team
    ----------------------------------------------- */

    await transporter.sendMail({
      from: `"NutriTrack AI Support" <${smtpUser}>`,
      to: supportEmail,
      replyTo: email,
      subject: supportSubject,
      text: supportText,
    });

    /* -----------------------------------------------
       Confirmation email to visitor
    ----------------------------------------------- */

    await transporter.sendMail({
      from: `"NutriTrack AI Support" <${smtpUser}>`,
      to: email,

      subject:
        "We received your NutriTrack AI support request",

      text: `
Hi ${name},

Thank you for contacting NutriTrack AI support.

We've received your support request and our team will review it.

----------------------------------------

Category: ${category}

Subject: ${subject}

----------------------------------------

Your message:

${message}

----------------------------------------

We'll get back to you as soon as possible.

Thanks,
NutriTrack AI Support
`,
    });
  } catch (error) {
    console.error(
      "Public support email error:",
      error
    );

    redirect(
      "/support?error=Unable%20to%20send%20your%20message.%20Please%20try%20again."
    );
  }

  /* =====================================================
     SUCCESS
  ===================================================== */

  redirect(
    "/support?success=Your%20message%20has%20been%20sent.%20We'll%20get%20back%20to%20you%20soon."
  );
}