import { cva, type VariantProps } from "class-variance-authority";
import * as Aria from "react-aria-components";

const button = cva(
  "rounded-md px-4 py-2 text-sm font-bold data-hovered:cursor-pointer",
  {
    variants: {
      action: {
        default: "bg-emerald text-midnight",
      },
    },
    defaultVariants: {
      action: "default",
    },
  }
);

const Button = ({
  className,
  action,
  ...props
}: Aria.ButtonProps & VariantProps<typeof button>) => {
  return <Aria.Button className={button({ action, className })} {...props} />;
};

export { Button };
