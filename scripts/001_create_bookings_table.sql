-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id BIGSERIAL PRIMARY KEY,
  package_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  travel_date DATE NOT NULL,
  adults_count INTEGER DEFAULT 1,
  children_count INTEGER DEFAULT 0,
  total_price DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting bookings (public access for booking form)
CREATE POLICY "Allow public to insert bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading own bookings (for future user dashboard)
CREATE POLICY "Allow users to read own bookings"
  ON public.bookings
  FOR SELECT
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);

-- Create policy to allow admin to read all bookings
CREATE POLICY "Allow service role to read all bookings"
  ON public.bookings
  FOR SELECT
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON public.bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
