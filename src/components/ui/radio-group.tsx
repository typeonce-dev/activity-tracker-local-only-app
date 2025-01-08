import { cva, type VariantProps } from "class-variance-authority";
import * as Aria from "react-aria-components";

const radio = cva(
  "bg-salt/10 rounded-full border-4 outline-none size-6 inline-block data-hovered:cursor-pointer",
  {
    variants: {
      theme: {
        magenta: "border-magenta data-selected:bg-magenta",
        dawn: "border-dawn data-selected:bg-dawn",
        skin: "border-skin data-selected:bg-skin",
        emerald: "border-emerald data-selected:bg-emerald",
        sky: "border-sky data-selected:bg-sky",
        fuchsia: "border-fuchsia data-selected:bg-fuchsia",
        midnight: "border-midnight data-selected:bg-midnight",
        salt: "border-salt data-selected:bg-salt",
      },
    },
  }
);

const RadioGroup = ({ ...props }: Aria.RadioGroupProps) => {
  return <Aria.RadioGroup {...props} />;
};

type RadioVariant = VariantProps<typeof radio>;
const Radio = ({
  className,
  theme,
  ...props
}: Aria.RadioProps & Required<Pick<RadioVariant, "theme">>) => {
  return <Aria.Radio className={radio({ className, theme })} {...props} />;
};

export { Radio, RadioGroup };
