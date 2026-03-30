import { Link } from "@/i18n/navigation";
import React from "react";

export function BottomLink({
  linkText,
  text,
  url,
}: {
  text: string;
  linkText: string;
  url: string;
}) {
  return (
    <p className="text-sm text-primary/50">
      {text}{" "}
      <Link href={url} className="font-medium text-primary hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
