import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navBar";



export const metadata: Metadata = {
  title: "Confession App",
  description: "An app for catholic confession",
};

type Props = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
