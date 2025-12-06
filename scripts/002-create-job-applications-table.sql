-- Create job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  position VARCHAR(255),
  experience VARCHAR(50),
  message TEXT,
  resume_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can apply)
CREATE POLICY "Anyone can submit job application" ON job_applications
  FOR INSERT WITH CHECK (true);

-- Create policy for reading (only authenticated admins)
CREATE POLICY "Only admins can read applications" ON job_applications
  FOR SELECT USING (false);

-- Create index for faster queries
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_created_at ON job_applications(created_at DESC);
