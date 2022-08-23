import { ChangeEventHandler } from "react";

export const Checkbox = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
};
