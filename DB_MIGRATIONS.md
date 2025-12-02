# DB Migrations Guide

This project uses `node-pg-migrate` to handle database migrations. This allows you to write database migrations in TypeScript and run them against your CloudSQL Postgres instance.

## Setup Overview
- **Dependencies**: `pg`, `node-pg-migrate`, `dotenv`
- **Configuration**: Scripts in `package.json`, `node-pg-migrate` configured for TypeScript.
- **Environment**: `.env` file required with `DATABASE_URL`.

## How to Use

### 1. Configure Database Connection
Copy `.env.example` to `.env` and update the `DATABASE_URL` with your CloudSQL connection string.
```bash
cp .env.example .env
# Edit .env
```

### 2. Create a Migration
Run the following command to create a new migration file in the `migrations` directory:
```bash
npm run migrate:create <migration-name>
# Example: npm run migrate:create add-users-table
```
This will create a `.ts` file in `migrations/`. Open it and define your `up` and `down` steps.

### 3. Run Migrations
To apply pending migrations:
```bash
npm run migrate:up
```

To revert the last migration:
```bash
npm run migrate:down
```

## Troubleshooting
- **Connection Issues**: Ensure your `DATABASE_URL` is correct and your IP is whitelisted in CloudSQL if running locally.
- **Node Version**: This setup is compatible with Node 16 (using `node-pg-migrate` v6). If you upgrade Node later, you might want to upgrade `node-pg-migrate` as well.
