-- Detflow DET practice tables + sample rows
-- Run this in Supabase Dashboard → SQL → New query

create extension if not exists "pgcrypto";

-- ── Reading ─────────────────────────────────────────
create table if not exists public.reading_passages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.reading_questions (
  id uuid primary key default gen_random_uuid(),
  passage_id uuid not null references public.reading_passages(id) on delete cascade,
  prompt text not null,
  choices jsonb not null,
  answer_index integer not null,
  sort_order integer not null default 0
);

-- ── Writing ─────────────────────────────────────────
create table if not exists public.writing_prompts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.writing_submissions (
  id uuid primary key default gen_random_uuid(),
  prompt_id uuid not null references public.writing_prompts(id) on delete cascade,
  body text not null,
  word_count integer not null,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_reading_questions_passage on public.reading_questions(passage_id);
create index if not exists idx_writing_submissions_prompt on public.writing_submissions(prompt_id);

-- RLS (public read for drills; anonymous can insert writing drafts)
alter table public.reading_passages enable row level security;
alter table public.reading_questions enable row level security;
alter table public.writing_prompts enable row level security;
alter table public.writing_submissions enable row level security;

create policy "reading_passages_select" on public.reading_passages
  for select using (true);

create policy "reading_questions_select" on public.reading_questions
  for select using (true);

create policy "writing_prompts_select" on public.writing_prompts
  for select using (true);

create policy "writing_submissions_insert" on public.writing_submissions
  for insert with check (true);

-- Sample content (safe to re-run only on empty DB; drop tables first if you need a reset)
insert into public.reading_passages (title, body)
select
  'Urban green spaces',
  'Many cities are investing in parks and tree-lined streets not only for beauty but for public health. Studies suggest that even short walks in green areas can lower stress and improve focus. Planners now treat vegetation as infrastructure: it manages stormwater, reduces heat islands, and gives residents safer places to move and socialize. The challenge is maintenance and equitable access—not every neighborhood receives the same level of funding.' 
where not exists (select 1 from public.reading_passages limit 1);

insert into public.reading_questions (passage_id, prompt, choices, answer_index, sort_order)
select rp.id,
  'What is ONE reason the passage gives for treating plants as infrastructure?',
  '["Because they decorate government buildings","Because they absorb noise only at night","Because they manage water and moderate temperature","Because they eliminate the need for roads"]'::jsonb,
  2,
  1
from public.reading_passages rp
where rp.title = 'Urban green spaces'
  and not exists (
    select 1 from public.reading_questions q where q.passage_id = rp.id
  );

insert into public.reading_questions (passage_id, prompt, choices, answer_index, sort_order)
select rp.id,
  'According to the passage, what is a challenge facing green space projects?',
  '["Choosing paint colors","Maintenance and fairness between neighborhoods","A lack of scientific interest","Building taller skyscrapers"]'::jsonb,
  1,
  2
from public.reading_passages rp
where rp.title = 'Urban green spaces'
  and (select count(*) from public.reading_questions q where q.passage_id = rp.id) = 1;

insert into public.writing_prompts (title, body)
select
  'Describe a change you would make in your community',
  'Write at least 50 words. Explain one change that would improve daily life where you live. Give a clear reason and one example of how it would help people.'
where not exists (select 1 from public.writing_prompts limit 1);
