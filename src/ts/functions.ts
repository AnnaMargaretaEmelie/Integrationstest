import { IMovie } from "./models/Movie";

export const movieSort = (movies: IMovie[], desc: boolean = true): IMovie[] => {
  const copy = [...movies];
  return copy.sort((a: IMovie, b: IMovie) => {
    if (a.Title === b.Title) return 0;
    const greater = a.Title > b.Title ? 1 : -1;
    return desc ? greater : -greater;
  });
};
