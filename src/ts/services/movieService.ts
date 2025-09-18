import { IOmdbResponse } from "./../models/IOmdbResponse";
import { IMovie } from "./../models/Movie";
import axios from "axios";

const API_URL = "https://omdbapi.com";

export const getData = async (searchText: string): Promise<IMovie[]> => {
  try {
    const { data } = await axios.get<IOmdbResponse>(API_URL, { params: { apikey: "416ed51a", s: searchText}});
    
  return Array.isArray(data?.Search) ? data.Search : [];
  } catch {
    return [];
  }
};