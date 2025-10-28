# Authentication Setup Guide

This project uses Next.js 15 with NextAuth.js and Drizzle ORM for authentication.

## Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm or yarn or pnpm
- Turso database account (or any SQLite database)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
TURSO_CONNECTION_URL=your_turso_connection_url_here
TURSO_AUTH_TOKEN=your_turso_auth_token_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### 3. Generate Database Migration

If this is your first time setting up, you need to create the database tables:

```bash
npm run db:generate
npm run db:migrate
```

If the scripts don't exist in package.json, you can generate and push schema changes using:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### 4. Seed Users

Run the user seed script to create default admin and regular users:

```bash
npm run seed:users
```

Or if you have all seeds:

```bash
npm run seed:all
```

This will create:

- **Admin User:**
  - Email: `admin@nsliveastro.com`
  - Password: `admin123`
- **Regular User:**
  - Email: `user@nsliveastro.com`
  - Password: `user123`

### 5. Run Development Server

```bash
npm run dev
```

### 6. Access the Application

- Visit: `http://localhost:3000`
- Login page: `http://localhost:3000/login`
- Admin panel: `http://localhost:3000/admin` (requires admin role)

## Authentication Features

### What's Included:

1. **NextAuth.js Integration**
   - Session management with JWT
   - Credentials-based authentication
   - Role-based access control (admin/user)

2. **Database Schema**
   - NextAuth required tables (accounts, sessions, verification_tokens)
   - Users table with bcrypt password hashing
   - Proper TypeScript types

3. **Route Protection**
   - Middleware-based route protection
   - Admin-only routes protected
   - Session-based authentication

4. **Session Provider**
   - Client-side session management
   - React hooks for session data

### File Structure:

```
src/
├── lib/
│   └── auth.ts              # NextAuth configuration
├── middleware.ts             # Route protection middleware
├── db/
│   ├── schema.ts            # Database schema with auth tables
│   └── seeds/
│       └── users.ts         # User seed script
├── app/
│   ├── layout.tsx            # Root layout with SessionProvider
│   ├── login/
│   │   └── page.tsx         # Login page
│   └── admin/
│       └── layout.tsx       # Admin layout with auth checks
├── components/
│   ├── SessionProvider.tsx  # Client session wrapper
│   └── LogoutButton.tsx    # Logout component
└── types/
    └── next-auth.d.ts       # NextAuth type extensions
```

## Usage Examples

### In Client Components:

```tsx
import { useSession, signIn, signOut } from "next-auth/react";

export default function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <p>Role: {session.user.role}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}
```

### In Server Components:

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ServerComponent() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Please log in</p>;
  }

  return <p>Welcome {session.user.name}</p>;
}
```

### Protect Routes:

Add routes to the middleware config:

```typescript
// src/middleware.ts
export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/your-protected-route/:path*",
  ],
};
```

## Customization

### Add New Roles:

1. Update the role type in the database schema
2. Add role checks in middleware
3. Update TypeScript types in `next-auth.d.ts`

### Add OAuth Providers:

Edit `src/lib/auth.ts` and add providers:

```typescript
import GoogleProvider from "next-auth/providers/google";

providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  // ... other providers
];
```

### Change Password Requirements:

Modify the bcrypt salt rounds in `src/lib/auth.ts`:

```typescript
const hashedPassword = await bcrypt.hash(password, 12); // 12 rounds instead of default 10
```

## Troubleshooting

### "Cannot find module 'bcrypt'"

Install the dependency:

```bash
npm install bcrypt @types/bcrypt
```

### Database connection errors

Check your `.env.local` file has the correct Turso credentials.

### Session not persisting

Ensure `NEXTAUTH_SECRET` is set and matches across environments.

### Middleware not working

Make sure `middleware.ts` is in the root `src/` directory, not in `src/app/`.

## Security Notes

1. **Always use environment variables** for secrets
2. **Hash passwords** before storing (already implemented with bcrypt)
3. **Use HTTPS** in production
4. **Set secure session cookies** in production
5. **Regularly rotate** NEXTAUTH_SECRET
6. **Keep dependencies updated**

## Next Steps

- Add email verification
- Implement password reset functionality
- Add two-factor authentication
- Set up rate limiting
- Configure session refresh tokens

## Support

For issues or questions, please check:

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Next.js Documentation](https://nextjs.org/docs)
