# Military Asset Management Frontend

This is the frontend application for the Military Asset Management System, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Visualize key metrics and asset status
- **Asset Management**: Track and manage military assets
- **Transfers**: Facilitate asset transfers between bases
- **Purchases**: Record and track asset purchases
- **Assignments**: Track asset assignments to personnel
- **Expenditures**: Record and track asset expenditures
- **Role-Based Access Control**: Different views and permissions based on user roles
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Data fetching and state management
- **Zustand**: Lightweight state management
- **Formik & Yup**: Form handling and validation
- **Chart.js**: Interactive charts and visualizations
- **Headless UI**: Accessible UI components
- **Heroicons**: Beautiful SVG icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API running (see [backend repository](../military-asset-management))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/military-asset-management-frontend.git
cd military-asset-management-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
military-asset-management-frontend/
├── public/                  # Static files
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── layout/          # Layout components
│   │   ├── notifications/   # Notification components
│   │   └── ui/              # UI components
│   ├── contexts/            # React contexts
│   ├── pages/               # Next.js pages
│   ├── services/            # API services
│   ├── stores/              # State management
│   ├── styles/              # Global styles
│   └── types/               # TypeScript types
├── .env.local               # Environment variables
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

## Authentication

The application uses JWT-based authentication. When a user logs in, a token is stored in localStorage and included in all API requests. The token is removed when the user logs out or when it expires.

## State Management

- **Zustand**: Used for global state management (auth, notifications)
- **React Query**: Used for server state management (data fetching, caching, and synchronization)

## Deployment

To deploy the application to production:

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

For deployment to platforms like Vercel or Netlify, follow their respective documentation.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

## License

This project is licensed under the MIT License.