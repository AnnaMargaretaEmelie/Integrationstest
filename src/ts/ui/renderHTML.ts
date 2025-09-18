import { IMovie } from "../models/Movie";

export function renderMovies(container: HTMLDivElement, movies: IMovie[]) {
    container.innerHTML = "";
    for(let i = 0; i<movies.length; i++) {
        const m = movies[i];

        const movie = document.createElement("div");
        const title = document.createElement("h3");
        const img = document.createElement("img");

        movie.classList.add("movie");
        title.textContent = m.Title;
        img.src = m.Poster;
        img.alt = m.Title;

        movie.appendChild(title);
        movie.appendChild(img);
        container.appendChild(movie);
    };
};

export function displayNoResult(container: HTMLDivElement) {
    container.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = "Inga sökresultat att visa";
};