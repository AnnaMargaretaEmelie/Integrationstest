import type { IMovie } from "../../models/Movie";

export const getData = async (_q: string): Promise<IMovie[]> => ([
  { Title: "Mock One", imdbID: "m1", Type: "movie", Poster: "m1.jpg", Year: "1999" },
  { Title: "Mock Two", imdbID: "m2", Type: "movie", Poster: "m2.jpg", Year: "2001" }
]);