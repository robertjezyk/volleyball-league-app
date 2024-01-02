import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { PHProvider, ToasterProvider } from "./providers";
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
    <ClerkProvider>
      <html lang="en">
        <PHProvider>
          <body className={inter.className}>
            <Navbar links={links} />
            <main className="px-4 py-6 lg:px-8 lg:py-12 max-w-6xl mx-auto">
              <ToasterProvider>{children}</ToasterProvider>
            </main>
          </body>
        </PHProvider>
      </html>
    </ClerkProvider>
  );
}
