export default async function PlantDetailsPage({ params }) {
    const { id } = await params;
    const apiKey = process.env.PERENUAL_API_KEY;

    const response = await fetch(
       `https://perenual.com/api/v2/species/details/${id}?key=${apiKey}`,
       { next: { revalidate: 3600 }}  
    );

   if (!response.ok) {
    const errorDetails = await response.text();

    console.error(
      'Perenual API error:',
      response.status,
      errorDetails
    );

    throw new Error(
      `Failed to fetch plant details. Status: ${response.status}`
    );
  }

    const plant = await response.json();

    return(
        <main className="shop">
            <h1>{plant.common_name}</h1>
            {plant.default_image?.regular_url && (
                <img
                    src={plant.default_image.regular_url}
                    alt={plant.common_name}
                    style={{ width: '100%', maxWidth: '500px' }}
                />
            )}

            <p>
                Scientific name: {plant.scientific_name?.[0] ?? 'Unknown'}
            </p>

            <p>
                Cycle: {plant.cycle ?? 'Unknown'}
            </p>

            <p>
                Watering: {plant.watering ?? 'Unknown'}
            </p>

            <p>
                Sunlight: {plant.sunlight?.join(', ') ?? 'Unknown'}
            </p>
        </main>
    );

}