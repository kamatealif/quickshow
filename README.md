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

## 🗄️ Database Schema (Core Tables)

### **bookings**

```sql
create table public.bookings (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  user_id uuid not null,
  movie_title text not null,
  show_date date not null,
  show_time time without time zone not null,
  seats text not null,
  theater_name text not null,
  total_amount numeric(10, 2) not null,
  constraint bookings_pkey primary key (id),
  constraint bookings_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint bookings_user_id_profiles_fkey foreign KEY (user_id) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_bookings_lookup on public.bookings using btree (movie_title, show_date, show_time) TABLESPACE pg_defaul);
```

### **Movies**

```sql

create table public.movies (
  id bigint not null,
  adult boolean null,
  backdrop_path text null,
  genre_ids jsonb null,
  original_language text null,
  overview text null,
  poster_path text null,
  release_date date null,
  title text null,
  vote_average double precision null,
  vote_count integer null,
  constraint movies_pkey primary key (id)
) TABLESPACE pg_default;
```

### **Profile**

```sql
create table public.profiles (
  id uuid not null,
  email text null,
  full_name text null,
  is_admin boolean null default false,
  created_at timestamp with time zone null default now(),
  username text null,
  avatar_url text null,
  phone text null,
  preferences jsonb null default '{}'::jsonb,
  updated_at timestamp with time zone null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_username_key unique (username),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_profiles_email on public.profiles using btree (email) TABLESPACE pg_default;

create index IF not exists idx_profiles_username on public.profiles using btree (username) TABLESPACE pg_default;

create trigger update_profiles_updated_at BEFORE
update on profiles for EACH row
execute FUNCTION update_updated_at_column ();
```

### **Seats**

```sql
create table public.seats (
  id uuid not null default gen_random_uuid (),
  showtime_id uuid not null,
  row_letter text not null,
  seat_number integer not null,
  type text null default 'regular'::text,
  price numeric(8, 2) not null,
  is_available boolean null default true,
  locked_by uuid null,
  locked_at timestamp with time zone null,
  constraint seats_pkey primary key (id),
  constraint seats_showtime_id_row_letter_seat_number_key unique (showtime_id, row_letter, seat_number),
  constraint seats_showtime_id_fkey foreign KEY (showtime_id) references showtimes (id) on delete CASCADE,
  constraint seats_type_check check (
    (
      type = any (
        array['regular'::text, 'premium'::text, 'vip'::text]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_seats_showtime_available on public.seats using btree (showtime_id, is_available) TABLESPACE pg_default;
```

## **ShowTimes**

```sql
create table public.showtimes (
  id uuid not null default gen_random_uuid (),
  movie_id bigint not null,
  theater_id uuid not null,
  date date not null,
  time time without time zone not null,
  price numeric(10, 2) not null,
  available_seats integer not null,
  total_seats integer not null,
  status text null default 'active'::text,
  created_at timestamp with time zone null default now(),
  constraint showtimes_pkey primary key (id),
  constraint showtimes_movie_id_theater_id_date_time_key unique (movie_id, theater_id, date, "time"),
  constraint showtimes_movie_id_fkey foreign KEY (movie_id) references movies (id),
  constraint showtimes_theater_id_fkey foreign KEY (theater_id) references theaters (id) on delete CASCADE,
  constraint showtimes_status_check check (
    (
      status = any (
        array['active'::text, 'cancelled'::text, 'full'::text]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_showtimes_movie_date on public.showtimes using btree (movie_id, date) TABLESPACE pg_default;

create index IF not exists idx_showtimes_theater_date on public.showtimes using btree (theater_id, date) TABLESPACE pg_default;
```

### **Theaters**
```sql
create table public.theaters (
  id uuid not null default gen_random_uuid (),
  name text not null,
  screen_type text not null,
  total_seats integer not null,
  seat_layout text null default '{"rows": ["A","B","C","D","E","F","G","H"], "seatsPerRow": 12, "vipRows": ["G","H"], "premiumRows": ["E","F"]}'::text,
  location text null,
  facilities text null default 'parking,snacks,wheelchair'::text,
  created_at timestamp with time zone null default now(),
  owner_id uuid null,
  constraint theaters_pkey primary key (id),
  constraint theaters_owner_id_fkey foreign KEY (owner_id) references auth.users (id),
  constraint theaters_screen_type_check check (
    (
      screen_type = any (
        array[
          'standard'::text,
          'premium'::text,
          'imax'::text,
          '4dx'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

```

### **User_Activiities**

```sql
create table public.user_activities (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  activity_type text not null,
  metadata jsonb null default '{}'::jsonb,
  ip_address inet null,
  user_agent text null,
  created_at timestamp with time zone null default now(),
  constraint user_activities_pkey primary key (id),
  constraint user_activities_user_id_fkey foreign KEY (user_id) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;
```



## 🔐 Authentication Flow

* Supabase handles email/password authentication

* Session stored via cookies

* Middleware protects admin routes

* Server Components fetch authenticated user securely

## ⚙️ Environment Setup
 ### 1️⃣ Clone the Repository

 ```bash
    git clone https://github.com/kamatealif/quickshow.git

    cd quickshow
```
 ### 2️⃣ Install Dependencies

  ```bash
 npm install
 ```
 ### 3️⃣ Configure Environment Variables

Create a .env.local file:
```bash 
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

▶️ Run Locally

```bash 
npm run dev
```

app ill be available at:


```url
http://localhost:3000
```


## 📊 Admin Dashboard Insights

* Total bookings

* Revenue trends

* Most booked movies

* Theater performance

* Booking conversion tracking

All metrics are computed server-side using Supabase queries and rendered efficiently with React Server Components.

---

## 🧪 Error Handling & Stability

* Defensive checks on all async data

* Graceful loading & empty states

* Toast-based user feedback

Runtime error protection for undefined data

🛠️ Common Commands
```bash 
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run lint checks
```

📦 Deployment

* Recommended deployment via Vercel:

* Push code to GitHub

* Import repo into Vercel

* Add environment variables

* Deploy

Supabase runs independently as managed backend.

--- 

## 🧩 Future Enhancements

* Online payment gateway integration

* Dynamic pricing per seat

* Seat map visualization

* QR code ticketing

* Email/SMS booking confirmation

* Redis caching for hot movies

## 👨‍💻 Author

Built with real-world scalability in mind — focusing on clean architecture, data integrity, and developer ergonomics.