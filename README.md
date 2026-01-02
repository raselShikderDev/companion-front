
# Companion Frontend – Comprehensive Documentation

## Overview
Companion is a role‑based travel matching platform frontend built with **Next.js App Router**.  
It supports **Explorers**, **Admins**, and **Super Admins**, enabling trip creation, matching, reviews, subscriptions, and administration dashboards.

This frontend is designed with **maximum Server Component usage**, secure authentication, scalable architecture, and production‑ready deployment on **Vercel**.

---

## Core Features
### Explorer
- Authentication & password management
- Create and manage trips
- Find trips & request matches
- Match lifecycle (pending → accepted → completed)
- Reviews & ratings
- Subscriptions (Free / Standard / Premium)
- Profile & settings management

### Admin
- Manage explorers & admins
- View and moderate trips
- View matches, reviews, payments
- Change user status (ACTIVE / BLOCKED / SUSPENDED)

### Super Admin
- All admin capabilities
- Create admins
- System‑level oversight

---

## Tech Stack
| Layer | Technology |
|-----|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| State | React Server Actions |
| Forms | Native FormData + Zod |
| Auth | JWT (Access + Refresh Tokens) |
| Cookies | HttpOnly, Secure, SameSite=None |
| API | REST (Backend on Express + Prisma) |
| Deployment | Vercel |

---

## Architecture Principles
- **Server‑first rendering**
- Minimal `"use client"` usage
- Secure cookie handling
- Role‑aware UI rendering
- Backend‑driven validation
- Clean separation of concerns

---

## Folder Structure
```
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   │   ├── admin/
│   │   ├── explorer/
│   ├── api/
│   ├── settings/
│   └── change-password/
│
├── components/
│   ├── admin/
│   ├── explorer/
│   ├── auth/
│   ├── shared/
│   └── ui/
│
├── lib/
│   ├── serverFetch.ts
│   ├── tokenHandler.ts
│   ├── authUtils.ts
│   ├── zodValidator.ts
│
├── services/
│   ├── auth/
│   ├── user/
│   ├── trip/
│   ├── match/
│
├── types/
└── zodSchemas/
```

---

## Authentication Flow
1. User submits login form
2. Frontend server action calls `/auth/signin`
3. Backend sets HttpOnly cookies
4. Frontend **re‑sets cookies using `cookies()`**
5. Tokens validated per request
6. Automatic refresh via `/auth/refresh-token`

### Cookie Rules (Critical)
- `secure: true`
- `sameSite: "none"`
- `path: "/"`
- Must be set **only once**
- Never clear cookies unless explicitly logging out

---

## Server Actions Pattern
- Validate input using Zod
- Call backend via `serverFetch`
- Never expose secrets to client
- Use `revalidatePath` / `revalidateTag` for freshness

Example:
```ts
"use server"
export async function updateProfile(_: any, formData: FormData) {
  // validation → API → revalidate
}
```

---

## Role‑Based Rendering
- UI fields rendered conditionally
- Admin does not send Explorer‑only fields
- Backend enforces final validation

---

## UI & Responsiveness
- Mobile‑first
- Tailwind breakpoints: `xs → xxl`
- Sticky navbar logic isolated
- Sidebar scrolls independently from main content
- Logout button pinned correctly

---

## Environment Variables
```
NEXT_PUBLIC_API_BASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
```

---

## Local Development
```bash
pnpm install
pnpm dev
```

Backend must be running and reachable.

---

## Production Notes (Vercel)
- Frontend & backend must both be HTTPS
- Cookies must use `SameSite=None`
- Avoid setting cookies twice
- Avoid mixing localhost & production domains

---

## Common Issues & Fixes
### Cookies disappearing
- Caused by mismatched `secure` / `sameSite`
- Or clearing cookies on refresh

### 404 API from frontend only
- Wrong base URL in `serverFetch`
- Missing `/api/v1` prefix

### Admin profile update failing
- Admin schema does not support Explorer fields
- Filter payload by role

---

## Best Practices Used
- Zero client auth logic
- Minimal state
- Server‑driven UI
- Secure cookie handling
- Clear role boundaries
- Production‑safe defaults

---

## Future Improvements
- Audit logs
- WebSockets for live matches
- Admin analytics dashboard
- Rate limiting UI feedback

---

## Maintainer Notes
This project is structured for **scalability**, **security**, and **team collaboration**.
All architectural decisions prioritize long‑term maintainability.

---

© Companion Platform
