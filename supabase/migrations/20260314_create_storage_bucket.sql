-- Supabase Storage bucket for logos and edital files
-- Run this after creating the tables migration.

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- Public read access to files
do $$
begin
	if not exists (
		select 1 from pg_policies
		where schemaname = 'storage'
			and tablename = 'objects'
			and policyname = 'Public read access to site-assets'
	) then
		create policy "Public read access to site-assets"
		on storage.objects
		for select
		using (bucket_id = 'site-assets');
	end if;

	if not exists (
		select 1 from pg_policies
		where schemaname = 'storage'
			and tablename = 'objects'
			and policyname = 'Public upload access to site-assets'
	) then
		create policy "Public upload access to site-assets"
		on storage.objects
		for insert
		to anon, authenticated
		with check (bucket_id = 'site-assets');
	end if;

	if not exists (
		select 1 from pg_policies
		where schemaname = 'storage'
			and tablename = 'objects'
			and policyname = 'Public update access to site-assets'
	) then
		create policy "Public update access to site-assets"
		on storage.objects
		for update
		to anon, authenticated
		using (bucket_id = 'site-assets')
		with check (bucket_id = 'site-assets');
	end if;

	if not exists (
		select 1 from pg_policies
		where schemaname = 'storage'
			and tablename = 'objects'
			and policyname = 'Public delete access to site-assets'
	) then
		create policy "Public delete access to site-assets"
		on storage.objects
		for delete
		to anon, authenticated
		using (bucket_id = 'site-assets');
	end if;
end $$;
