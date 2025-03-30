import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import SessionProviders from "@/lib/sessionProviders";
import StoreProvider from "@/lib/storeProvider";

export const metadata: Metadata = {
  title: "RE-LIST | Relist, Reuse, Recycle",
  description: "Our mission is to create a sustainable marketplace by offering an easy way for people to sell and buy secondhand goods, reduce waste, and promote recycling.",
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
          <StoreProvider>

            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <div>
                <main className="min-h-screen">{children}</main>
                <Toaster />
              </div>
            </ThemeProvider >
          </StoreProvider>
        </SessionProviders>
      </body>
    </html >
  );
}
