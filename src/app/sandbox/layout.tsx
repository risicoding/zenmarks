import React from "react";

const SandboxLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {children}
    </div>
  );
};

export default SandboxLayout;
