-- Deploy fresh database tabels:
\i '/docker-entrypoint-initdb.d/tables/schema.sql'

-- For testing purposes only. This file will add dummy data
--\i '/docker-entrypoint-initdb.d/seed/seed.sql'