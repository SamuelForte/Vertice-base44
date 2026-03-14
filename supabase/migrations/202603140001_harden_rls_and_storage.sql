-- Harden RLS policies for production usage with Supabase Auth.
-- Safe to run multiple times.

-- =====================
-- Editais
-- =====================
drop policy if exists allow_read_editais on public.editais;
drop policy if exists allow_write_editais on public.editais;

create policy allow_read_editais on public.editais
  for select to anon, authenticated using (true);

create policy allow_insert_editais_auth on public.editais
  for insert to authenticated with check (true);

create policy allow_update_editais_auth on public.editais
  for update to authenticated using (true) with check (true);

create policy allow_delete_editais_auth on public.editais
  for delete to authenticated using (true);

-- =====================
-- Mensagens
-- =====================
drop policy if exists allow_read_mensagens on public.mensagens;
drop policy if exists allow_write_mensagens on public.mensagens;

create policy allow_insert_mensagens_public on public.mensagens
  for insert to anon, authenticated with check (true);

create policy allow_read_mensagens_auth on public.mensagens
  for select to authenticated using (true);

create policy allow_update_mensagens_auth on public.mensagens
  for update to authenticated using (true) with check (true);

create policy allow_delete_mensagens_auth on public.mensagens
  for delete to authenticated using (true);

-- =====================
-- Site Configs
-- =====================
drop policy if exists allow_read_site_configs on public.site_configs;
drop policy if exists allow_write_site_configs on public.site_configs;

create policy allow_read_site_configs on public.site_configs
  for select to anon, authenticated using (true);

create policy allow_insert_site_configs_auth on public.site_configs
  for insert to authenticated with check (true);

create policy allow_update_site_configs_auth on public.site_configs
  for update to authenticated using (true) with check (true);

create policy allow_delete_site_configs_auth on public.site_configs
  for delete to authenticated using (true);

-- =====================
-- Storage bucket policies
-- =====================
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

drop policy if exists "Public read access to site-assets" on storage.objects;
drop policy if exists "Public upload access to site-assets" on storage.objects;
drop policy if exists "Public update access to site-assets" on storage.objects;
drop policy if exists "Public delete access to site-assets" on storage.objects;

create policy "Public read access to site-assets"
on storage.objects
for select
using (bucket_id = 'site-assets');

create policy "Authenticated upload access to site-assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets');

create policy "Authenticated update access to site-assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');

create policy "Authenticated delete access to site-assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets');
