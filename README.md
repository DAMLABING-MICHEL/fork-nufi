# Nufi
A centralized notification platform for apps.

## Table of Contents

* [About The Project](#about-the-project)
    * [Built With](#built-with)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Database Setup](#database-setup)
* [Usage](#usage)

## About The Project

Nufi is a tool that enables centralised notification management for modern applications. It allows notifications to be sent via several channels:
* In App
* Push
* Email
* SMS
* etc.

Using it involves creating an account, adding apps, and integrating it into the host app. Integrating it into host apps requires generating access parameters, including an app ID and app password.

### Built With

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [Prisma](https://www.prisma.io/)
* [MongoDB](https://www.mongodb.com/)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Nodemon (for development)](https://nodemon.io/)

## Getting Started

This section will guide you through setting up the project locally.

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js) or yarn
* MongoDB installed and running, or access to a MongoDB Atlas cluster.
* Git

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/kamvusoft/nufi.git](https://github.com/kamvusoft/nufi.git)
    ```
2.  Navigate into the project directory:
    ```bash
    cd nufi
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Database Setup

1.  **Create a `.env` file** in the root of your project based on the `.env.example` file.
    ```
    # .env
    DATABASE_URL="mongodb+srv://<username>:<password>@<your-cluster-url>/<your-database-name>?retryWrites=true&w=majority"
    PORT=3000
    NODE_ENV=development
    # Add any other environment variables here
    ```
    Replace `<username>`, `<password>`, `<your-cluster-url>`, and `<your-database-name>` with your MongoDB connection details.

2.  **Generate Prisma Client:**
    ```bash
    npx prisma generate
    ```
    This command reads your `schema.prisma` file and generates the Prisma Client based on your database schema.

3.  **Push Prisma Schema to Database (for initial setup or schema changes):**
    If you're starting with an empty database or have made changes to your `schema.prisma` file, you'll need to push the schema to MongoDB. Prisma will create the necessary collections.
    ```bash
    npx prisma db push
    ```
    *Note: `prisma db push` is suitable for development. For production environments, consider using `prisma migrate deploy` after generating migration files with `prisma migrate dev` or a more robust CI/CD pipeline.*

## Usage

To start the development server:

```bash
npm run dev
# or
yarn dev
