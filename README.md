# ChawkBazar Documentation

![ChawkBazar](https://github.com/asagtcc/Initalstorefront/assets/76824315/d2d4f432-aedf-4730-bc0c-df2f24eef02d)

## Introduction

ChawkBazar is a high-speed e-commerce template built with React, Next.js, TypeScript, @tanstack/react-query, and Tailwind CSS. It provides an efficient solution for creating an e-commerce website with a modern tech stack. 

## Requirements

To work with ChawkBazar, ensure you have the following software installed:
- Node.js (version 18.17.0 or later)
- Yarn (version 1.22.19)
- Editor: Visual Studio Code (recommended)

## Technologies Used

ChawkBazar utilizes the following technologies:
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started & Installation

Follow these steps to get started with ChawkBazar:

1. **Configure your env file**:
   - Rename `.env.local.template` to `.env.local` in the project directory.
   - Replace placeholder values with your actual API endpoint.

2. **Running the project**:
   - Navigate to the `chawkbazar` directory.
   - Run the following commands:
     ```bash
     $ yarn
     $ yarn dev # Run the template for development
     ```

3. **Testing production build**:
   - For testing the production build in the local environment, run:
     ```bash
     yarn build
     yarn start # Start template in production mode
     ```

## Folder Structure & Customization

ChawkBazar has the following folder structure:

- `src/settings/site-settings.ts`: Setup site's basic information.
- `tailwind.config.js`: Customize Tailwind CSS configuration.
- `/public`: Change API data, favicon, multi-language assets.
- `/src/components`: Template-related UI components.
- `/src/containers`: Common sections related components.
- `/src/contexts`: Necessary context for the template (e.g., cart, UI).
- `/src/framework`: Data fetching related codes.
- `/src/pages`: Pages created for Next.js routing mechanism.
- `/src/settings`: Setup site's basic settings.
- `/src/styles`: Custom CSS files.
- `/src/utils`: Hooks, routes, motion effects, etc.

## Multi-Language Support

ChawkBazar supports multi-language using the `next-i18next` package.

## RTL (Right-to-Left Language) Support

ChawkBazar provides RTL support. Modify `/src/utils/get-direction.ts` according to your needs.

## Data Fetching

ChawkBazar uses `@tanstack/react-query` for data fetching. Data is fetched from a public JSON source. You'll need to customize the hooks to integrate your actual API endpoint.

## Configuration & Deployment

### Deploying to Vercel

To host the template on Vercel:
- Navigate to `chawkbazar`.
- Put your API endpoint in `vercel.json`.
- Run `vercel` command.

For other hosting providers, refer to [Next.js Application Deployment](https://nextjs.org/docs/deployment).
