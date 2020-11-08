import React, { useState } from "react";

export const Code = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <pre
      className={isOpen ? "open" : "closed"}
      onClick={() => setOpen(!isOpen)}
    >
      {children}
    </pre>
  );
};
