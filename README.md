# Superteam Earn Notifications Bot

## Overview

This Telegram bot is designed to notify users of new opportunities listed on Superteam Earn, a platform for bounties and projects. Users can personalize their notifications based on various criteria, ensuring they only receive relevant alerts.

## Features

* **Personalized Notifications:** Users can customize notifications based on:
    * USD value of listings.
    * Type of opportunity (Bounties, Projects, or both).
    * Specific skills (selected from Earn's subskill list).
* **Targeted Alerts:** Notifies users only for opportunities relevant to their profile's geography and global opportunities they are eligible for.
* **Seamless Telegram Integration:** Accessible via a direct link from the Superteam Earn user menu, opening directly within the Telegram interface.
* **In-bot Configuration:** All notification settings and preferences are managed directly within the Telegram bot.
* **Detailed Notification Content:** Each notification includes:
    * Title of the listing.
    * Sponsor's name.
    * Reward token name and value.
    * Reward amount in USD (or "Variable Comp" / range for projects).
    * Direct link to the listing on Superteam Earn with UTM tracking (`?utm_source=telegrambot`).
    * Listing deadline.
* **Delayed Notifications:** Notifications for new listings are sent 12 hours after publication on Superteam Earn.

---

## Technology Stack

* **Programming Language:** TypeScript
* **Runtime:** Node.js
* **Package Manager:** pnpm
* **Database:** Prisma (as indicated by `prisma` directory)

---

## Installation Steps

To set up and run the Superteam Earn Notifications Bot locally, follow these steps:

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js** (LTS version recommended)
* **pnpm** (You can install it via npm: `npm install -g pnpm`)
* A **PostgreSQL** database (or another database supported by Prisma, configured in `schema.prisma`)
* A **Telegram Bot Token** (obtainable from BotFather on Telegram)

### Step-by-Step Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/GnoudNart/superteam_earn_notifications_bot
    cd superteam_earn_notifications_bot
    ```

2.  **Install dependencies:**

    Navigate to the project root directory and install the required dependencies using pnpm:

    ```bash
    pnpm install
    ```

3.  **Database Setup:**

    This project uses Prisma for database management. You will need to configure your database connection and run migrations.

    * **Configure your database connection string:** Create a `.env` file in the root directory of the project. Copy the contents of `.env.example` to `.env` and update the `DATABASE_URL` variable with your database connection string. For example:

        ```
        DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
        ```

      *(Ensure your database server is running and accessible.)*

    * **Run database migrations:** Apply the Prisma migrations to create the necessary tables in your database:

        ```bash
        pnpm prisma migrate dev
        ```

      *(This command will create or update your database schema based on `prisma/schema.prisma`.)*

    * **Seed the database (optional):** If you have initial data to populate your database (e.g., for testing or default configurations), you can run the seed script:

        ```bash
        pnpm prisma db seed
        ```

4.  **Environment Variables:**

    In addition to `DATABASE_URL`, you need to set up other essential environment variables in your `.env` file. These typically include your Telegram Bot Token and any other API keys or configurations.

    ```
    TELEGRAM_BOT_TOKEN="YOUR_TELEGRAM_BOT_TOKEN"
    # Add any other required environment variables here, such as API keys for external services
    ```

    *(Refer to the source code, specifically `src/bot.ts` and `api/sendNotifications.ts`, for all required environment variables. It's crucial to set these correctly for the bot to function.)*

5.  **Build the project:**

    Compile the TypeScript code into JavaScript:

    ```bash
    pnpm build
    ```

6.  **Run the bot:**

    You can run the bot in production mode or development mode:

    * **Production Mode:**

        ```bash
        pnpm start
        ```

    * **Development Mode (with hot-reloading):**

        ```bash
        pnpm dev
        ```

      *(This mode is recommended for local development as it automatically restarts the bot on code changes.)*

---

## Usage

Once the bot is running, users can interact with it via Telegram. The bot will guide them through the process of setting up their notification preferences.

---
