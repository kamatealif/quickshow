import { pgTable, text, integer, doublePrecision, bigint } from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  imdbId: text("imdb_id").primaryKey(),
  titleX: text("title_x"),
  posterPath: text("poster_path"),
  wikiLink: text("wiki_link"),
  titleY: text("title_y"),
  originalTitle: text("original_title"),
  isAdult: integer("is_adult"),
  yearOfRelease: integer("year_of_release"),
  runtime: text("runtime"),
  genres: text("genres"),
  imdbRating: doublePrecision("imdb_rating"),
  imdbVotes: bigint("imdb_votes", { mode: "number" }),
  story: text("story"),
  summary: text("summary"),
  tagline: text("tagline"),
  actors: text("actors"),
  winsNominations: text("wins_nominations"),
  releaseDate: text("release_date"),
});