import { IMovie } from "./models/Movie";
import { getData } from "./services/movieService";
import { renderMovies, displayNoResult } from "./ui/renderHTML";

let movies: IMovie[] = [];

export const init = () => {
  let form = document.getElementById("searchForm") as HTMLFormElement;
  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    handleSubmit();
  });
};

export async function handleSubmit() {
  const input = (document.getElementById("searchText") as HTMLInputElement);

  const container = document.getElementById(
    "movie-container"
  ) as HTMLDivElement;
  container.innerHTML = "";

  try {
    movies = await getData(input.value);

    if (movies.length > 0) {
      renderMovies(container, movies);
    } else {
      displayNoResult(container);
    }
  } catch {
    displayNoResult(container);
  }
}
