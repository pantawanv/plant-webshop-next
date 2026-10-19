import Link from 'next/link';
import AddToCartButton from "../../components/AddToCartButton";

async function getPlants() {
  const apiKey = process.env.PERENUAL_API_KEY;

  if (!apiKey) {
    throw new Error('Missing PERENUAL_API_KEY in .env.local');
  }

  const url =
    `https://perenual.com/api/v2/species-list?key=${apiKey}&indoor=1`;

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch plants from Perenual.');
  }

  const result = await response.json();

  return (result.data ?? [])
    .filter(
      (plant) =>
        plant.common_name &&
        plant.default_image?.regular_url
    )
    .slice(0, 15);
}

export default async function ShopPage() {
  const plants = await getPlants();



  return (
    <main className="shop">
      <h1>Our Plants 🌿</h1>
      <p className="intro">
        Find your next favourite indoor plant.
      </p>

      {plants.length === 0 ? (
        <p>No plants with images were found.</p>
      ) : (
        <div className="plant-grid">
          {plants.map((plant) => (
            <Link 
              key={plant.id} 
              href={`/shop/${plant.id}`}
              className="plant-card"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
              <img
                src={plant.default_image.regular_url}
                alt={plant.common_name}
                className="plant-image"
              />

              <div className="plant-info">
                <h2>{plant.common_name}</h2>

                {plant.scientific_name?.[0] && (
                  <p className="scientific">
                    {plant.scientific_name[0]}
                  </p>
                )}
                
                <AddToCartButton plant={plant} />
               
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
