"use client";

// import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { AnimatePresence } from "framer-motion";
import { FhevmProvider } from "@/providers/FhevmProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { createAppKit } from "@reown/appkit/react";
import Header from "@/components/layout/Header";

import { projectId, metadata, networks, wagmiAdapter } from "@/config";

const queryClient = new QueryClient();

createAppKit({
  adapters: [wagmiAdapter],
  defaultAccountTypes: { eip155: "eoa" },
  enableWalletGuide: false,
  projectId,
  networks,
  metadata,
  enableCoinbase: false,
  coinbasePreference: "smartWalletOnly",
  themeMode: "light" as const,
  themeVariables: {
    "--w3m-border-radius-master": "0",
    "--w3m-font-family": "Telegraf",
  },
  features: {
    legalCheckbox: true,
    analytics: true,
    swaps: false,
    send: false,
    history: false,
    connectMethodsOrder: ["email", "social", "wallet"],
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{metadata.name}</title>
        <Script
          src="https://cdn.zama.ai/fhevmjs/0.6.2/fhevmjs.umd.cjs"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <div id="root">
          <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <TooltipProvider>
                <FhevmProvider>
                  <ThemeProvider>
                    <Toaster />
                    <Sonner />
                    <Header />
                    <AnimatePresence mode="wait">{children}</AnimatePresence>
                  </ThemeProvider>
                </FhevmProvider>
              </TooltipProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </div>
      </body>
    </html>
  );
}
