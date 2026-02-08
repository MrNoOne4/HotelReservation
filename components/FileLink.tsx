import React from "react";

type FileLinkProps = {
  fileName: React.ReactNode;
  fileUrl: string;
  fileSize?: React.ReactNode;
};

export default function FileLink({ fileName, fileUrl, fileSize }: FileLinkProps) {
  return (
    <a
      href={fileUrl} // must be a valid URL to a public file
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-green-700 underline"
    >
      <svg
        className="w-5 h-5 text-green-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      <span>{fileName}</span>
    </a>
  );
}
