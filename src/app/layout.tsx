import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import SessionProviders from "@/lib/sessionProviders";

export const metadata: Metadata = {
  title: "Joy Chandra Uday | Full Stack Developer",
  description: "I am a passionate MERN Stack Developer specializing in building dynamic and responsive web applications",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <SessionProviders>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div>
              <main className="min-h-screen">{children}</main>
              <Toaster />
            </div>
          </ThemeProvider >
        </SessionProviders>
      </body>
    </html >
  );
}
