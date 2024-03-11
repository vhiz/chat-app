import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat app",
  description: "Connect with your friend around the world ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen bg-gradient-to-tr from-purple-500/30 to-red-500/30">
          {children}
        </div>
      </body>
    </html>
  );
}
