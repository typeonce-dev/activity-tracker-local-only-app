import { LoaderCircleIcon } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircleIcon size={16} className="animate-spin" />
    </div>
  );
}