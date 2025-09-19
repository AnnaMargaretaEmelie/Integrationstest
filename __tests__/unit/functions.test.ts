import { movieSort } from "../../src/ts/functions";
import type { IMovie } from "../../src/ts/models/Movie";

//test helper
const m = (Title: string, over: Partial<IMovie> = {}): IMovie => ({
    Title,
    imdbID: Title.toLowerCase(),
    Type: "movie",
    Poster: "",
    Year: "2000",
    ...over
});

describe("movieSort()", () => {
    test("Sort A-Ö when desc=true", ()=> {
        //Assign
        const input: IMovie[] = [m("Bingo"), m("Arriba"), m("Churro")];

        //Act
        const res = movieSort(input, true);

        //Assert
        expect(res.map(x=> x.Title)).toEqual(["Arriba", "Bingo", "Churro"]);

    });

    test("Sort Ö-A when desc=false", ()=> {
        //Assign
        const input: IMovie[] = [m("Bingo"), m("Arriba"), m("Churro")];

        //Act
        const res = movieSort(input, false);

        //Assert
        expect(res.map(x=> x.Title)).toEqual(["Churro", "Bingo", "Arriba"]);

    });

    test("Handles doubles determistic", () => {
        //Assign
        const input: IMovie[] = [m("Bingo"), m("Bingo"), m("Churro")];

        //Act
        const resDesc = movieSort([...input], true);
        const resAsc = movieSort([...input], false);

        //Assert
        expect(resDesc.map(x => x.Title)).toEqual(["Bingo", "Bingo", "Churro"]);
        expect(resAsc.map(x => x.Title)).toEqual(["Churro", "Bingo", "Bingo"]);

    });

    test("Empty array gives empty array", () => {
        const res = movieSort([], true);
        expect(res).toEqual([]);
    })

  test("Does not mute input array", () => {
    const input: IMovie[] = [m("B"), m("A")];
    const clone = [...input];
    const res = movieSort(input, true);
    expect(input).toEqual(clone);     // oförändrat
    expect(res).not.toBe(input);      // ny referens
  });
});


