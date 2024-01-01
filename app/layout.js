import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Store - OmOptik Panvel",
  description:
    "Created by Arjun Praveen Varshney in collaboration with Github Copilot for OmOptik Panvel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
