"use client";

import { useState } from "react";
import { NumPad } from "@/components/ui/NumPad";

export function NumPadDemo() {
  const [value, setValue] = useState("7");
  return <NumPad value={value} onChange={setValue} onValidate={() => {}} />;
}
