import "./global.css";
import { Inter, Sora } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
 return (
  <html lang="en">
    <body className={`${inter.variable} ${sora.variable}`}>
      {children}
    </body>
  </html>
);
}