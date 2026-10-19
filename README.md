# Plant Webshop 🌿

A plant webshop built with Next.js as Part 2 of my assignment. The application allows users to browse indoor plants, view plant details, add plants to a shopping cart, update quantities, and complete a checkout.

## Features

- Browse indoor plants fetched from the Perenual API.
- View individual plant details using dynamic routes.
- Add and remove plants from the cart.
- Increase and decrease item quantities.
- View the total price of the cart.
- Complete checkout and receive an order confirmation.
- Use Redux Toolkit to manage cart state.
- Use a Next.js Route Handler to process order requests.

## Technologies

- Next.js (App Router)
- React
- Redux Toolkit and React Redux
- Tailwind CSS
- Perenual API
- JavaScript

## Installation

1. Clone the repository:

   git clone https://github.com/pantawanv/plant-webshop-next

2. Navigate to the project folder:

   cd plant-webshop-next

3. Install the dependencies:

   npm install

4. Create a `.env.local` file in the project root and add your Perenual API key:

   PERENUAL_API_KEY=your_api_key_here

   Replace `your_api_key_here` with your own API key from Perenual.

5. Start the development server:

   npm run dev

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for production

To create a production build, run:

npm run build

To run the production build locally:

npm run start

## API

Plant information is fetched from the Perenual API.

The application also includes a Next.js Route Handler at `/api/orders`, which accepts POST requests from the checkout page and returns an order response.

The current checkout is a demonstration: orders are not saved permanently to a database and no payment is processed.

## Environment Variables

The application requires the following environment variable:

- `PERENUAL_API_KEY` — API key used to fetch plant information.

Keep your API key private. Do not commit `.env.local` to GitHub.

## Deployment

The application is deployed using Vercel. The deployed application requires `PERENUAL_API_KEY` to be configured in the project's environment variables.

## Author

Created as part of a web development assignment comparing React and Next.js.
