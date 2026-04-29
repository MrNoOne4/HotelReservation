import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function buildMessageEmail(email: string, otp: string): string {
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

        <section style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:20px;">
                <div style="max-width:480px;margin:40px auto;background:#ffffff;
                    border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.05);
                    border:1px solid #e5e7eb;overflow:hidden;">

                  <!-- Header -->
                  <div style="background:#2563eb;padding:24px;text-align:center;">
                    <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">
                      Hotel Reservation System
                    </h2>
                    <p style="margin:4px 0 0;color:#dbeafe;font-size:13px; color:white;">
                      Reset Password OTP for ${email}
                    </p>
                  </div>

                  <!-- Body -->
                  <div style="padding:32px;">
                    <p style="margin:0 0 12px;font-size:16px;font-weight:500;">
                      You have requested to reset your password. Please use the following OTP to proceed with resetting your password:
                    </p>

            

                    <div style="background:#f9fafb;border:1px solid #e5e7eb;
                                border-radius:8px;padding:16px;margin-bottom:24px;
                                font-size:14px;color:#374151;line-height:1.5;">
                      ${otp}
                    </div>
                    
                    <p style="margin:0;font-size:13px;color:#6b7280;">
                      this is automated email, please do not reply to this email.
                    </p>
                  </div>

                  <!-- Footer -->
                  <div style="border-top:1px solid #e5e7eb;padding:16px;text-align:center;background:#f9fafb;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;">
                      &copy; ${year} Hotel Reservation System · This is an automated notification
                    </p>
                  </div>
                </div>
        </section>

      </body>
      </html>
        `;
}



export async function POST(req: NextRequest) {
    try {
        const { email, message } = await req.json();
        if (!email || !message) {
            return NextResponse.json({ message: "Email and message are required" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Hotel Reservation Forgot Password" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Forgot Password OTP for ${email}`,
            html: buildMessageEmail(email, message),
        });

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
