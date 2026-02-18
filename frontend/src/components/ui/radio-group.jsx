import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = ({ className, ...props }) => (
  <RadioGroupPrimitive.Root
    className={cn("flex gap-4", className)}
    {...props}
  />
);

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "h-4 w-4 rounded-full border border-gray-300 bg-white text-blue-600 shadow focus:outline-none focus:ring-2 focus:ring-blue-500",
      className
    )}
    {...props}
  />
));

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
