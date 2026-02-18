import * as React from "react";
import { cn } from "@/lib/utils";

const Card = ({ className, ...props }) => {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white shadow-sm", className)} {...props} />
  );
};

export { Card };
