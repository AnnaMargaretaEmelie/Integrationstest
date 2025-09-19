

jest.mock("../../src/ts/services/movieService");

import { init, handleSubmit } from "../../src/ts/movieApp";

describe("movieApp integration", () => {
  const mountDom = () => {
    document.body.innerHTML = `
      <form id="searchForm">
        <input id="searchText" />
        <button type="submit">Sök</button>
      </form>
      <div id="movie-container"></div>
    `;
  };

  beforeEach(() => {
    mountDom();
    jest.clearAllMocks();
  });

  test("AAA — handleSubmit renderar filmer från mockad service", async () => {
    (document.querySelector("#searchText") as HTMLInputElement).value = "star";

    await handleSubmit();

    const items = document.querySelectorAll("#movie-container .movie");
    expect(items.length).toBe(2);
    expect(document.body.textContent).toMatch(/Mock One/i);
  });

  test("AAA — init binder submit-event och triggar render", async () => {
    init();

    const input = document.querySelector<HTMLInputElement>("#searchText")!;
    const form = document.querySelector<HTMLFormElement>("#searchForm")!;
    input.value = "empire";

    form.dispatchEvent(new Event("submit"));
    await Promise.resolve(); // låt async kedjan bli klar

    const items = document.querySelectorAll("#movie-container .movie");
    expect(items.length).toBe(2);
  });
});
