-- `schema.sql` should contain the necessary SQL commands to create the `users` table.

-- Drop the existing users table if it already exists (for testing purposes)
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    verification_code VARCHAR(6),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
