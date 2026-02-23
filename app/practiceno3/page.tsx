"use client"
import { signIn } from "next-auth/react";

const providers = ['google', 'facebook']; // or get from your API

export default function LoginChooser() {
  return (
    <div>
      {providers.map((provider) => (
        <button className="cursor-pointer" key={provider} onClick={() => signIn(provider, {callbackUrl: '/practiceno7'})}>
          Sign in with {provider}
        </button>
      ))}
    </div>
  );
}