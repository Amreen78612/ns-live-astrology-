# Environment Setup Guide

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration (Turso)
TURSO_CONNECTION_URL=your_turso_database_url_here
TURSO_AUTH_TOKEN=your_turso_auth_token_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here
NODE_ENV=development
```

## How to Get the Required Values

### 1. Turso Database

- Sign up at [turso.tech](https://turso.tech)
- Create a new database
- Get your connection URL and auth token from the dashboard

### 2. NextAuth Secret

Generate a secure random secret key using one of these methods:

**On Windows (PowerShell):**

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**On macOS/Linux:**

```bash
openssl rand -base64 32
```

**Or use Node.js:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Setup Steps

1. Copy the environment variables above to `.env.local`
2. Fill in your Turso database credentials
3. Generate and add your NextAuth secret
4. Run the database migrations: `npm run db:push`
5. Seed the database with initial users: `npm run seed:users`
6. Start the development server: `npm run dev`

## Test Credentials

After seeding the database, you can login with:

**Admin User:**

- Email: `admin@nsliveastro.com`
- Password: `admin123`

**Regular User:**

- Email: `user@nsliveastro.com`
- Password: `user123`
