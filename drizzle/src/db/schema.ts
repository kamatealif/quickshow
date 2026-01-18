import {
  pgTable,
  uuid,
  integer,
  text,
  numeric,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: uuid("id").defaultRandom().primaryKey(),
  tmdbId: integer("tmdb_id").unique(),

  title: text("title").notNull(),
  overview: text("overview"),
  releaseDate: date("release_date"),
  rating: numeric("rating", { precision: 3, scale: 1 }),

  posterPath: text("poster_path"),
  backdropPath: text("backdrop_path"),
  language: text("language"),
  popularity: numeric("popularity"),

  createdAt: timestamp("created_at").defaultNow(),
});
