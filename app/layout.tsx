import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { inter } from "./fonts/fonts";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";

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
    <html lang="en">
      <body className={`${inter.className} text-primary antialiased`}>
        <div className="relative h-auto min-h-svh w-full md:space-y-4">
          <Header />
          <main>
            <Providers>
              {children}
              <Analytics />
            </Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
