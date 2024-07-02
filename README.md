# Hostal Managment System UWU Family

Welcome to the official repository for the University of Vavuniya Hostel Residences Management System! This project aims to simplify the hostel accommodation process for students by allowing them to swap between hostels, apply for new hostels, and manage ward accommodations seamlessly.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview
This system is built to facilitate the hostel management process at the University of Vavuniya (UWU), Sri Lanka. It provides a streamlined way for hostelers to manage their accommodations.

## Features
- Swap between hostels
- Apply for new hostels
- Manage ward accommodations
- Role-based authentication using Clerk provider from [Clerk.com](https://clerk.com)
- Interactive maps using [OpenLayers](https://openlayers.org)

## Tech Stack
### Backend
- **Node.js**
- **TypeScript**
- **Express.js**
- **PostgreSQL** with **Prisma ORM**

### Frontend
- **React**
- **Next.js 14**
- **TypeScript**
- **open-layers**

## Setup
### Prerequisites
- Node.js
- npm or yarn
- PostgreSQL

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/nishansanjuka/hostal-management-system-client.git
    ```
2. Navigate to the project directory:
    ```sh
    cd hostal-management-system-client
    ```
3. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```
4. Create a `.env` file and configure your environment variables:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
    CLERK_SECRET_KEY=""
    WEBHOOK_SECRET=""
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=""
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=""
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=""
    CLERK_SIGN_IN_FORCE_REDIRECT_URL=""
    CLERK_SIGN_UP_FORCE_REDIRECT_URL=""
    CLERK_BASE_URL=""
    API_BASE_URL=""
    DATABASE_URL=""
    ```
5. Start the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

## API Endpoints
The backend API is hosted on Render and Korio platforms. Below are some of the key endpoints:

### Authentication
- `POST /sign-in` - Sign in a user
- `POST /sign-up` - Sign up a new user

For a complete list of endpoints and their usage, refer to the [Backend API Repo](https://github.com/Thiwanka-Sandakalum/Hostal-management-systerm).

## Usage
### Swap Hostel
1. Navigate to the "Swap Hostel" page.
2. Select the current hostel and the desired hostel to swap.
3. Submit the swap request.

### Apply for New Hostel
1. Navigate to the "Hostels" page.
2. Fill in the required details and submit the application.

## Contributing
We welcome contributions from the community! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b clerk-auth`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin clerk-auth`).
6. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Happy coding!

