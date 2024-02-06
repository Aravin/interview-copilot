import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interview Copilot",
  description: "Opinionated interview copilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={`${inter.className} max-h-[100vh] max-w-[100vw] overflow-hidden`}>
        <Navbar />

        <div className="flex flex-col justify-between min-h-[calc(100vh-4rem)]">
          <main className="flex-1">{children}</main>

          <footer className="footer footer-center p-4 bg-neutral text-neutral-content sticky bottom-0">
            <aside>
              <p>Copyright © 2024 - Aravind A</p>
            </aside>
          </footer>
        </div>
      </body>
    </html>
  );
}
