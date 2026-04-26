import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

 interface Option {
  label: string;
  value: string;
}

interface props {
  label: string;
  rooms: Option[];
  value?: string;
  onChange: (value: string) => void;
}

export function SelectDemo({ label, rooms, value, onChange }: props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {rooms.map((e) => (
            <SelectItem key={e.value} value={e.value}>
              {e.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
