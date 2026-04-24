CREATE TABLE ratings (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  hall       TEXT        NOT NULL CHECK (hall IN ('maseeh','mccormick','next','baker','simmons','vassar')),
  stars      INTEGER     NOT NULL CHECK (stars BETWEEN 1 AND 5),
  comment    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX ratings_hall_time ON ratings (hall, created_at DESC);

-- Allow anonymous reads and inserts (no auth required)
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can read ratings"
  ON ratings FOR SELECT USING (true);

CREATE POLICY "anyone can insert ratings"
  ON ratings FOR INSERT WITH CHECK (true);
