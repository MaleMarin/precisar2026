import { Barlow } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  variable: "--font-barlow",
});

export default function CulturaDigitalLayout({ children }: { children: React.ReactNode }) {
  return <div className={barlow.variable}>{children}</div>;
}
