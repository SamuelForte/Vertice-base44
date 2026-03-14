-- Vertice schema for Supabase
-- Run this in Supabase SQL Editor

create extension if not exists pgcrypto;

create or replace function public.set_updated_date()
returns trigger
language plpgsql
as $$
begin
  new.updated_date = now();
  return new;
end;
$$;

create table if not exists public.editais (
  id uuid primary key default gen_random_uuid(),
  numero text not null,
  titulo text not null,
  sigla_instituicao text not null,
  nome_instituicao text,
  area_atuacao text not null,
  municipio text not null,
  estado text default 'MA',
  status text not null default 'Aberto',
  descricao text,
  requisitos text,
  vagas integer,
  remuneracao text,
  data_publicacao date,
  data_inicio_inscricoes date,
  data_fim_inscricoes date,
  arquivo_cronograma_url text,
  arquivo_cronograma_nome text,
  cronograma jsonb not null default '[]'::jsonb,
  documentos jsonb not null default '[]'::jsonb,
  link_inscricao text,
  contato_email text,
  contato_telefone text,
  destaque boolean not null default false,
  ano integer,
  logo_url text,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now()
);

create table if not exists public.mensagens (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  assunto text not null,
  mensagem text not null,
  lida boolean not null default false,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now()
);

create table if not exists public.site_configs (
  id uuid primary key default gen_random_uuid(),
  chave text not null unique,
  logo_url text,
  nome_site text,
  created_date timestamptz not null default now(),
  updated_date timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'trg_editais_updated_date'
      and tgrelid = 'public.editais'::regclass
  ) then
    create trigger trg_editais_updated_date
    before update on public.editais
    for each row execute function public.set_updated_date();
  end if;

  if not exists (
    select 1
    from pg_trigger
    where tgname = 'trg_mensagens_updated_date'
      and tgrelid = 'public.mensagens'::regclass
  ) then
    create trigger trg_mensagens_updated_date
    before update on public.mensagens
    for each row execute function public.set_updated_date();
  end if;

  if not exists (
    select 1
    from pg_trigger
    where tgname = 'trg_site_configs_updated_date'
      and tgrelid = 'public.site_configs'::regclass
  ) then
    create trigger trg_site_configs_updated_date
    before update on public.site_configs
    for each row execute function public.set_updated_date();
  end if;
end $$;

alter table public.editais enable row level security;
alter table public.mensagens enable row level security;
alter table public.site_configs enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where policyname = 'allow_read_editais' and tablename = 'editais'
  ) then
    create policy allow_read_editais on public.editais
      for select to anon, authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies where policyname = 'allow_write_editais' and tablename = 'editais'
  ) then
    create policy allow_write_editais on public.editais
      for all to anon, authenticated using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies where policyname = 'allow_read_mensagens' and tablename = 'mensagens'
  ) then
    create policy allow_read_mensagens on public.mensagens
      for select to anon, authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies where policyname = 'allow_write_mensagens' and tablename = 'mensagens'
  ) then
    create policy allow_write_mensagens on public.mensagens
      for all to anon, authenticated using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies where policyname = 'allow_read_site_configs' and tablename = 'site_configs'
  ) then
    create policy allow_read_site_configs on public.site_configs
      for select to anon, authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies where policyname = 'allow_write_site_configs' and tablename = 'site_configs'
  ) then
    create policy allow_write_site_configs on public.site_configs
      for all to anon, authenticated using (true) with check (true);
  end if;
end $$;
