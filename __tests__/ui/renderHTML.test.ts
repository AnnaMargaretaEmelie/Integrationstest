import { renderMovies, displayNoResult } from "../../src/ts/ui/renderHTML";
import type { IMovie } from "../../src/ts/models/Movie";

const m = (Title: string, over: Partial<IMovie> = {}): IMovie => ({
  Title,
  imdbID: Title.toLowerCase(),
  Type: "movie",
  Poster: `${Title}.jpg`,
  Year: "2000",
  ...over,
});

describe("UI rendering (renderHTML.ts)", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    document.body.innerHTML = `<div id="movie-container"></div>`;
    container = document.querySelector("#movie-container") as HTMLDivElement;
  });

  test("renderMovies render titles and pictures", () => {
    // Assign
    const movies: IMovie[] = [m("Arriba"), m("Bingo")];

    // Act
    renderMovies(container, movies);

    // Assert
    const cards = container.querySelectorAll(".movie");
    expect(cards.length).toBe(2);

    const firstTitle = container.querySelector("h3")!;
    const firstImg = container.querySelector("img")!;

    expect(firstTitle.textContent).toBe("Arriba");
    expect(firstImg.getAttribute("src")).toBe("Arriba.jpg");
    expect(firstImg.getAttribute("alt")).toBe("Arriba");
  });

  test("renderMovies clears container before writing", () => {
    container.innerHTML = `<div class="old">old</div>`;

    renderMovies(container, [m("OnlyOne")]);

    expect(container.querySelector(".old")).toBeNull();
    expect(container.querySelectorAll(".movie").length).toBe(1);
  });

  test("displayNoResult shows message and clears content", () => {
    renderMovies(container, [m("WillBeCleared")]); 
    displayNoResult(container);

    expect(container.querySelectorAll(".movie").length).toBe(0);
    expect(container.textContent).toMatch(/Inga sökresultat att visa/i);
  });
});