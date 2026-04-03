import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

type AvatarWithBadgeProps = {
  avatar?: string;
  name?: string;
  className?: string;
};

export function AvatarWithBadge({ avatar, name, className }: AvatarWithBadgeProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "CN";

  return (
    <div className={`flex items-center bg-transparent border-none object-contain  ${className || ""}`}>
      <Avatar className="">
        {avatar && <AvatarImage src={avatar} alt={name} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {name && (
        <h1 className={`ml-2 ${className} text-lg font-sans font-light pointer-events-none`}>
          <strong className="pointer-events-none">{name}</strong>
        </h1>
      )}
    </div>
  );
}