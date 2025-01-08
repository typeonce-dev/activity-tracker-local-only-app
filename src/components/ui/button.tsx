import { cva, type VariantProps } from "class-variance-authority";
import * as Aria from "react-aria-components";

const button = cva(
  "rounded-md border px-4 py-2 text-sm font-bold data-hovered:cursor-pointer",
  {
    variants: {
      action: {
        default:
          "border-emerald text-emerald data-hovered:bg-emerald/5 transition-colors duration-100",
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
