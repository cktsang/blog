import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { inter } from "./fonts/fonts";
import Providers from "./providers";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | Chikin Tsang",
    default: "CK's Blog",
    absolute: "...",
  },
  description: "A blog about more than just web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} text-neutral-950 antialiased dark:text-neutral-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative h-auto min-h-svh w-full md:space-y-4">
            <Header />
            <main>
              <Providers>{children}</Providers>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
