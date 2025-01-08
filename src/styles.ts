import { cva } from "class-variance-authority";

export const containerColor = cva("", {
  variants: {
    theme: {
      magenta: "bg-magenta",
      dawn: "bg-dawn",
      skin: "bg-skin",
      emerald: "bg-emerald",
      sky: "bg-sky",
      fuchsia: "bg-fuchsia",
      midnight: "bg-midnight",
      salt: "bg-salt",
    },
  },
});

export const textColor = cva("", {
  variants: {
    theme: {
      magenta: "text-magenta border-magenta",
      dawn: "text-dawn border-dawn",
      skin: "text-skin border-skin",
      emerald: "text-emerald border-emerald",
      sky: "text-sky border-sky",
      fuchsia: "text-fuchsia border-fuchsia",
      midnight: "text-midnight border-midnight",
      salt: "text-salt border-salt",
    },
  },
});
