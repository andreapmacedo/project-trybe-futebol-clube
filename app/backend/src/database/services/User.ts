import MovieModel from "../models/movies";
import { Movie, MovieBody } from "../types";

export default class MovieService {
  public movieModel = new MovieModel();
  
  // constructor(public movieModel = new MovieModel()){}

  async listAll(): Promise<Movie[]> {
    const movies: Movie[] = await this.movieModel.listAll();

    return movies;
  }

  async create(data: MovieBody) {
    const movie = await this.movieModel.create(data);

    return movie;
  }
}