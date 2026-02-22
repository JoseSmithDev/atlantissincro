-- ============================================
-- Atlantis Sincro — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================

-- 1. Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  role text not null default 'parent' check (role in ('parent', 'admin')),
  full_name text,
  location text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Competitions table
create table public.competitions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  date date,
  slug text unique,
  cover_url text,
  created_at timestamptz not null default now()
);

alter table public.competitions enable row level security;

create policy "Anyone can read competitions"
  on public.competitions for select
  using (true);

create policy "Admins can insert competitions"
  on public.competitions for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update competitions"
  on public.competitions for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete competitions"
  on public.competitions for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 3. Photos table (stored in Cloudflare R2)
create table public.photos (
  id uuid default gen_random_uuid() primary key,
  competition_id uuid references public.competitions(id) on delete cascade not null,
  r2_key text not null,
  url text not null,
  storage_path text not null,
  width integer,
  height integer,
  caption text,
  created_at timestamptz not null default now()
);

alter table public.photos enable row level security;

create policy "Authenticated users can read photos"
  on public.photos for select
  using (auth.role() = 'authenticated');

create policy "Admins can insert photos"
  on public.photos for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete photos"
  on public.photos for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 4. News table
create table public.news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.news enable row level security;

create policy "Anyone can read published news"
  on public.news for select
  using (published = true);

create policy "Admins can read all news"
  on public.news for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can insert news"
  on public.news for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update news"
  on public.news for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete news"
  on public.news for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 5. Site content table (editable text sections)
create table public.site_content (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value_es text not null,
  type text not null default 'text' check (type in ('text', 'image')),
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "Anyone can read site content"
  on public.site_content for select
  using (true);

create policy "Admins can update site content"
  on public.site_content for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can insert site content"
  on public.site_content for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 6. Trial days table (admin sets available dates for trial sessions)
create table public.trial_days (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  time_slot text not null,
  max_slots integer not null default 2,
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.trial_days enable row level security;

create policy "Anyone can read active trial days"
  on public.trial_days for select
  using (active = true);

create policy "Admins can read all trial days"
  on public.trial_days for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can insert trial days"
  on public.trial_days for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update trial days"
  on public.trial_days for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete trial days"
  on public.trial_days for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 7. Reservations table (parents book a trial)
create table public.reservations (
  id uuid default gen_random_uuid() primary key,
  trial_day_id uuid references public.trial_days(id) on delete set null,
  parent_name text not null,
  parent_email text not null,
  parent_phone text not null,
  child_name text not null,
  child_age integer not null,
  status text not null default 'pendiente' check (status in ('pendiente', 'confirmada', 'cancelada')),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.reservations enable row level security;

create policy "Anyone can insert reservations"
  on public.reservations for insert
  with check (true);

create policy "Admins can read all reservations"
  on public.reservations for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update reservations"
  on public.reservations for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete reservations"
  on public.reservations for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Seed default site content
insert into public.site_content (key, value_es, type) values
  ('hero_title', 'Atlantis Sincro', 'text'),
  ('hero_subtitle', 'Club de Natación Artística en Valencia', 'text'),
  ('about_us', 'Somos un club dedicado a la natación artística en Valencia. Familia Atlantis combina excelencia competitiva con valores sociales y disciplina. Nuestro equipo de entrenadoras profesionales trabaja con nadadoras de todas las edades y niveles.', 'text'),
  ('schedule_info', 'Lunes a Viernes: 17:00 - 20:00 | Sábados: 10:00 - 13:00', 'text');
