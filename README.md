# 🎬 Movie Ticket Booking Application

A full-stack **Movie Ticket Booking Platform** built with **Next.js (App Router)** and **Supabase**, designed to handle real-world booking flows such as movie listings, showtimes, seat selection, bookings, and admin dashboards.

This project follows modern SaaS architecture patterns with server components, client components, authentication, and database-driven UI.

---

## 🚀 Features

### User Side
- Browse movies and showtimes
- Select seats and book tickets
- Secure authentication (login/signup)
- View booking history
- Real-time seat availability

### Admin Side
- Dashboard analytics (bookings, revenue, top movies)
- Manage movies, theaters, and showtimes
- Delete and update theaters/movies
- Search and filter bookings
- Role-based access (admin vs user)

---

## 🧠 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend     | Next.js 14 (App Router) |
| UI           | Tailwind CSS + Shadcn UI |
| Backend      | Supabase (PostgreSQL + Auth) |
| Auth         | Supabase Auth |
| Database     | PostgreSQL |
| Icons        | Lucide Icons |
| Notifications| Sonner |
| Deployment   | Vercel |

---

## 📁 Project Structure

```txt
app/
├── admin/
│   ├── bookings/
│   ├── movies/
│   ├── theaters/
│   └── dashboard/
├── auth/
├── movies/
├── bookings/
├── layout.tsx
├── page.tsx

components/
├── ui/
├── admin/
├── shared/

lib/
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   └── middleware.ts

types/
utils/
```
