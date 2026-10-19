import Link from "next/link";


export default function Home() {
  return (
    <main>
      <h1 className="text-4xl mb-8 mt-8 text-center">Welcome to my plant webshop🌱</h1>

      <img
        src="/orchids.jpg"
        alt="Orchid image"
        width={400}
        height={400}
        className="mx-auto pb-8"
      />
      <p className="text-center"> Discover a wide variety of plants to bring life and freshness to your
        home. <br />
        Browse our collection and find the perfect plant companions for your
        space. Happy shopping!</p>

        <Link href="/shop" className="text-center mt-4  mb-8 block hover:underline">
          Explore our plants
        </Link>
    </main>

  );
}