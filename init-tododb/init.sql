-- init-db/init.sql

CREATE TABLE todo
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    completed BOOLEAN
);
