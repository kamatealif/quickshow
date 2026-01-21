
-- # rls
alter table public.profiles enable row level security;


-- clerks's sub (user id);
create policy "Users can read own profile"
on public.profiles
for select
using (auth.uid() = id);
