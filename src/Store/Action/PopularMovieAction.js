import { api } from "../../api/api";

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      api
    );

    if (!response.ok) {
      throw new Error("eroor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
