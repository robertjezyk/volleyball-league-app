import Link from "next/link";
import { getLeagues } from "@/utils/actions";

const HomePage = async () => {
  const leagues = await getLeagues();
  const links = leagues.map((league) => ({
    url: `/leagues/${league.id}`,
    text: league.type,
  }));

  return (
    <>
      <h1 className="text-5xl mb-8 font-bold">League Teams</h1>
      <Link href={links[0].url} className="btn btn-accent">
        Get Started
      </Link>
    </>
  );
};

export default HomePage;
