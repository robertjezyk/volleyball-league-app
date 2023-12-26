import Link from "next/link";
import { getLeagues } from "@/utils/actions";

const HomePage = async () => {
  const leagues = await getLeagues();
  const links = leagues.map((league) => ({
    url: `/leagues/${league.id}`,
    text: league.type,
  }));

  console.log(leagues);

  return (
    <>
      <h1 className="text-3xl mb-8 font-bold">
        Leicestershire Volleyball League
      </h1>

      <Link href={links[0].url} className="btn btn-accent">
        {leagues[0].season}
      </Link>
    </>
  );
};

export default HomePage;
