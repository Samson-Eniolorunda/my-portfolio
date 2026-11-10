"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 border border-fg px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-fg hover:text-bg"
    >
      <Printer className="size-4" /> Print
    </button>
  );
}
