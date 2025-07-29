import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
