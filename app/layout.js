import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { getLeagues } from "@/utils/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Volleyball League",
  description: "Leicestershire Volleyball League page",
};

export default async function RootLayout({ children }) {
  const leagues = await getLeagues();
  const links = leagues.map((league) => ({
    url: `/leagues/${league.id}`,
    text: league.type,
  }));

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar links={links} />
        <main className="px-8 py-12 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
