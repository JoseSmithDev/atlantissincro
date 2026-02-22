export type Profile = {
  id: string;
  email: string | null;
  role: 'parent' | 'admin';
  full_name: string | null;
  location: string | null;
  created_at: string;
};

export type Competition = {
  id: string;
  name: string;
  date: string | null;
  slug: string | null;
  cover_url: string | null;
  created_at: string;
};

export type Photo = {
  id: string;
  competition_id: string;
  r2_key: string;
  url: string;
  storage_path: string;
  width: number | null;
  height: number | null;
  caption: string | null;
  created_at: string;
};

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
};

export type TrialDay = {
  id: string;
  date: string;
  time_slot: string;
  max_slots: number;
  notes: string | null;
  active: boolean;
  created_at: string;
};

export type Reservation = {
  id: string;
  trial_day_id: string | null;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  child_name: string;
  child_age: number;
  status: 'pendiente' | 'confirmada' | 'cancelada';
  notes: string | null;
  created_at: string;
  trial_day?: TrialDay;
};

export type SiteContent = {
  id: string;
  key: string;
  value_es: string;
  type: 'text' | 'image';
  updated_at: string;
};
