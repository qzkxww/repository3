/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key): User's unique identifier
      - `email` (text): User's email address
      - `full_name` (text): User's full name
      - `is_premium` (boolean): Premium subscription status
      - `created_at` (timestamptz): Account creation timestamp
      - `updated_at` (timestamptz): Last update timestamp
    
    - `tasks`
      - `id` (uuid, primary key): Task's unique identifier
      - `user_id` (uuid): Reference to users table
      - `title` (text): Task title/description
      - `platform` (text): Social media platform
      - `frequency` (text): Task frequency (Daily, Weekly, Custom)
      - `completed` (boolean): Task completion status
      - `created_at` (timestamptz): Task creation timestamp
      - `completed_at` (timestamptz): Task completion timestamp
    
    - `platform_stats`
      - `id` (uuid, primary key): Stat entry unique identifier
      - `user_id` (uuid): Reference to users table
      - `platform` (text): Social media platform name
      - `engagement_rate` (numeric): Platform engagement rate
      - `follower_count` (integer): Current follower count
      - `post_count` (integer): Total posts made
      - `recorded_at` (timestamptz): Stats recording timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read and update their own user data
      - CRUD operations on their own tasks
      - Read and create their own platform stats
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  full_name text,
  is_premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  platform text NOT NULL,
  frequency text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  CONSTRAINT valid_platform CHECK (platform IN ('Instagram', 'Twitter', 'TikTok', 'LinkedIn', 'YouTube', 'Facebook')),
  CONSTRAINT valid_frequency CHECK (frequency IN ('Daily', 'Weekly', 'Custom'))
);

-- Create platform_stats table
CREATE TABLE IF NOT EXISTS platform_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  engagement_rate numeric DEFAULT 0,
  follower_count integer DEFAULT 0,
  post_count integer DEFAULT 0,
  recorded_at timestamptz DEFAULT now(),
  CONSTRAINT valid_platform CHECK (platform IN ('Instagram', 'Twitter', 'TikTok', 'LinkedIn', 'YouTube', 'Facebook'))
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_stats ENABLE ROW LEVEL SECURITY;

-- User Policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Task Policies
CREATE POLICY "Users can read own tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Platform Stats Policies
CREATE POLICY "Users can read own platform stats"
  ON platform_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own platform stats"
  ON platform_stats
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to update user's updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks(user_id);
CREATE INDEX IF NOT EXISTS tasks_platform_idx ON tasks(platform);
CREATE INDEX IF NOT EXISTS platform_stats_user_id_idx ON platform_stats(user_id);
CREATE INDEX IF NOT EXISTS platform_stats_platform_idx ON platform_stats(platform);