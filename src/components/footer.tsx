import * as React from "react";

export interface FooterProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FooterContainer = React.forwardRef<HTMLInputElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className="font-urbanist absolute inset-x-0 bottom-0 mx-auto py-8 pr-8 text-base text-white"
        ref={ref}
        {...props}
      />
    );
  },
);

const FooterItem = React.forwardRef<HTMLInputElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return <p className="text-end" ref={ref} {...props} />;
  },
);

export { FooterContainer, FooterItem };
