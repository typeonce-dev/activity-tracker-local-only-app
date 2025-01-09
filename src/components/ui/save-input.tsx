type NativeProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function SaveInput<Name extends string = never>(
  props: Omit<NativeProps, "name"> & {
    name: Name;
  }
) {
  return <input {...props} />;
}
