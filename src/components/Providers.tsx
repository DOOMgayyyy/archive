// src/components/Providers.tsx
"use client";

import { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
