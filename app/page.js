import Link from 'next/link'

const HomePage = () => {
  return (
    <>
      <h1 className="text-5xl mb-8 font-bold">League Teams</h1>
      <Link href="/women" className="btn btn-accent">
        Get Started
      </Link>
    </>
  )
}

export default HomePage