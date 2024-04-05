import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function GlobalSearch({ value: initValue, onChange, ...props }) {
  const [value, setValue] = useState(initValue);
  useEffect(() => {
    setValue[initValue];
  }, [initValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);
    return () => clearTimeout(timeout);
  }, [value]);
  return (
    <>
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}
