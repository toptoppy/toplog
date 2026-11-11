-- Add color column to tags table for custom tag badge styling
ALTER TABLE tags ADD COLUMN IF NOT EXISTS color VARCHAR(30);
