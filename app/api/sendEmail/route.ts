import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

function buildOtpEmail(name: string, otp: string, expiryMins: number = 10): string {
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your OTP Code</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">

  <div style="max-width:480px;margin:40px auto;background:#ffffff;
              border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.05);
              border:1px solid #e5e7eb;overflow:hidden;">

    <!-- Header -->
    <div style="background:#2563eb;padding:24px;text-align:center;">
      <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">
        OTP Verification
      </h2>
      <p style="margin:4px 0 0;color:#dbeafe;font-size:13px;">
        Hotel Reservation System
      </p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <p style="margin:0 0 12px;font-size:16px;font-weight:500;">
        Hi ${name},
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#374151;line-height:1.5;">
        Use the verification code below to complete your request. 
        Please do not share this code with anyone.
      </p>

      <!-- OTP Box -->
      <div style="text-align:center;margin-bottom:24px;">
        <div style="display:inline-block;background:#eff6ff;border:1px dashed #2563eb;
                    border-radius:8px;padding:20px 32px;font-size:32px;
                    font-weight:bold;letter-spacing:10px;color:#2563eb;">
          ${otp}
      </div>



      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
        If you didn’t request this code, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #e5e7eb;padding:16px;text-align:center;background:#f9fafb;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        &copy; ${year} Hotel Reservation · Automated message · Do not reply
      </p>
    </div>

  </div>

</body>
</html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
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
      from: `"Hotel Reservation System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code – Hotel Reservation",
      html: buildOtpEmail(name, message, 10),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
