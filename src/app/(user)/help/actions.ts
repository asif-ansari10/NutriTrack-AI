"use server";

import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

import { createClient } from "@/lib/supabase/server";

/* =========================================================
   SEND SUPPORT EMAIL
========================================================= */

export async function sendSupportMessage(
  formData: FormData
) {
  const supabase = await createClient();

  /* -------------------------------------------------------
     Get logged-in user
  ------------------------------------------------------- */

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      "/login?error=Please%20login%20to%20contact%20support."
    );
  }

  /* -------------------------------------------------------
     Get profile
  ------------------------------------------------------- */

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const name =
    String(formData.get("name") || "").trim();

  const email =
    String(formData.get("email") || "").trim();

  const category =
    String(formData.get("category") || "").trim();

  const subject =
    String(formData.get("subject") || "").trim();

  const message =
    String(formData.get("message") || "").trim();

  /* -------------------------------------------------------
     Validation
  ------------------------------------------------------- */

  if (!name) {
    redirect(
      "/help?error=Please%20enter%20your%20name."
    );
  }

  if (!email) {
    redirect(
      "/help?error=Please%20enter%20your%20email."
    );
  }

  if (!category) {
    redirect(
      "/help?error=Please%20select%20a%20category."
    );
  }

  if (!subject) {
    redirect(
      "/help?error=Please%20enter%20a%20subject."
    );
  }

  if (!message) {
    redirect(
      "/help?error=Please%20describe%20your%20problem."
    );
  }

  if (message.length < 10) {
    redirect(
      "/help?error=Please%20provide%20a%20little%20more%20detail."
    );
  }

  /* -------------------------------------------------------
     SMTP configuration
  ------------------------------------------------------- */

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
      "/help?error=Support%20email%20is%20not%20configured."
    );
  }

  /* -------------------------------------------------------
     Transporter
  ------------------------------------------------------- */

  const transporter =
    nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,

      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

  /* -------------------------------------------------------
     Support email
  ------------------------------------------------------- */

  const supportSubject =
    `[NutriTrack AI Support] ${category} - ${subject}`;

  const supportText = `
New support request from NutriTrack AI

----------------------------------------
USER INFORMATION
----------------------------------------

Name: ${name}
Email: ${email}
Account Email: ${user.email || email}
User ID: ${user.id}

Profile Name: ${profile?.full_name || "Not available"}

----------------------------------------
REQUEST
----------------------------------------

Category: ${category}
Subject: ${subject}

Message:

${message}

----------------------------------------
Sent from NutriTrack AI Help Center
`;

  try {
    /* -----------------------------------------------------
       Send email to you
    ----------------------------------------------------- */

    await transporter.sendMail({
      from: `"NutriTrack AI Support" <${smtpUser}>`,
      to: supportEmail,

      replyTo: email,

      subject: supportSubject,

      text: supportText,
    });

    /* -----------------------------------------------------
       Confirmation email to user
    ----------------------------------------------------- */

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
      "Support email error:",
      error
    );

    redirect(
      "/help?error=Unable%20to%20send%20your%20message.%20Please%20try%20again."
    );
  }

  /* -------------------------------------------------------
     Success
  ------------------------------------------------------- */

  redirect(
    "/help?success=Your%20message%20has%20been%20sent.%20We'll%20get%20back%20to%20you%20soon."
  );
}