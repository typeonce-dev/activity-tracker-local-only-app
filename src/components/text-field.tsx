import * as Aria from "react-aria-components";
import { cn } from "../utils";

const TextField = ({ ...props }: Aria.TextFieldProps) => {
  return <Aria.TextField {...props} />;
};

const Label = ({ ...props }: Aria.LabelProps) => {
  return <Aria.Label {...props} />;
};

const Input = ({ className, ...props }: Aria.InputProps) => {
  return (
    <Aria.Input
      className={cn(
        "border border-sky rounded-md px-3 py-2 text-sm w-full outline-none",
        className
      )}
      {...props}
    />
  );
};

const FieldError = ({ className, ...props }: Aria.FieldErrorProps) => {
  return (
    <Aria.FieldError
      className={cn("text-dawn text-sm", className)}
      {...props}
    />
  );
};

export { FieldError, Input, Label, TextField };
