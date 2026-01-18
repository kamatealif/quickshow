CREATE TABLE "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" integer,
	"title" text NOT NULL,
	"overview" text,
	"release_date" date,
	"rating" numeric(3, 1),
	"poster_path" text,
	"backdrop_path" text,
	"language" text,
	"popularity" numeric,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "movies_tmdb_id_unique" UNIQUE("tmdb_id")
);
