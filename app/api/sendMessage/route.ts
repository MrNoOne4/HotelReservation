import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

function buildMessageEmail(name: string, message: string): string {
  const year = new Date().getFullYear();

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>New Message Received</title>
      </head>
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">

        <div style="max-width:480px;margin:40px auto;background:#ffffff;
                    border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.05);
                    border:1px solid #e5e7eb;overflow:hidden;">

          <!-- Header -->
          <div style="background:#2563eb;padding:24px;text-align:center;">
            <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">
              Hotel Reservation System
            </h2>
            <p style="margin:4px 0 0;color:#dbeafe;font-size:13px;">
              New Customer Message
            </p>
          </div>

          <!-- Body -->
          <div style="padding:32px;">
            <p style="margin:0 0 12px;font-size:16px;font-weight:500;">
              Hello,
            </p>

            <p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.5;">
              You have received a new message from <strong>${name}</strong>.
            </p>

            <div style="background:#f9fafb;border:1px solid #e5e7eb;
                        border-radius:8px;padding:16px;margin-bottom:24px;
                        font-size:14px;color:#374151;line-height:1.5;">
              ${message}
            </div>

            <p style="margin:0;font-size:13px;color:#6b7280;">
              Please respond to this message at your earliest convenience.
            </p>
          </div>

          <!-- Footer -->
          <div style="border-top:1px solid #e5e7eb;padding:16px;text-align:center;background:#f9fafb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              &copy; ${year} Hotel Reservation System · This is an automated notification
            </p>
          </div>

        </div>

      </body>
      </html>
        `;
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER}>`,
      to: "mathewdemesa1@gmail.com",
      subject: `Message from ${email}`,
      html: buildMessageEmail(firstName + " " + lastName, message),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}