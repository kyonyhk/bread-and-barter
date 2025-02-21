-- Fix for the identities table last_sign_in_at

do $$
begin
  update auth.identities
  set last_sign_in_at = created_at
  where last_sign_in_at is null;
end $$; 