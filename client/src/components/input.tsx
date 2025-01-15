import React from "react";

type Props = {
  label?: string;
};

const Input = React.forwardRef(function MyInput(
  props: Props,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <label>
      {props?.label}
      <input ref={ref} />
    </label>
  );
});

export default Input;
