import { getData } from "../../../src/ts/services/movieService";
import type { IMovie } from "../../../src/ts/models/Movie";
import type { IOmdbResponse } from "../../../src/ts/models/IOmdbResponse";

import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("movieService.getData", ()=> {
    test("Returns movies when Search exists", async ()=> {
        //Assign
        const movies: IMovie[] = [
            {Title: "Armageddon", imdbID: "t1", Type: "movie", Poster: "a.jpg", Year: "2000"},
            {Title: "Brothers in arms", imdbID: "t2", Type: "movie", Poster: "n.jpg", Year: "2001"}
        ];
        const payload: {data: IOmdbResponse} = {data: {Search: movies}};
        mockedAxios.get.mockResolvedValueOnce(payload as any);

        //Act

        const result = await getData("star");

        //Assert
        expect(result).toHaveLength(2);
        expect(result[0].Title).toBe("Armageddon");
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    test("Returns [] when Search is missing", async ()=> {
        //Assign
        const payload = { data: {}};
        mockedAxios.get.mockResolvedValueOnce(payload as any);

        //Act
        const result = await getData("nope");

        //Assert
        expect(result).toEqual([]);
    });

    test("Returns [] when axios error", async ()=> {

        //Assign
        mockedAxios.get.mockRejectedValueOnce(new Error("network"));

        //Act
        const result = await getData("boom");

        //Assert
        expect(result).toEqual([]);
    });
});