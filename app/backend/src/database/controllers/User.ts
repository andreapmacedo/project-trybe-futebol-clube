import { Request, Response } from "express";
import MovieService from "../services/movies";
import { Movie, MovieBody } from "../types";

const movieService = new MovieService();

export async function listAll(req: Request, res: Response) {
  const movies = await movieService.listAll();

  res.status(200).json(movies);
}

export async function createMovie(req: Request<unknown, unknown, MovieBody>, res: Response<Movie>) {
  const body = req.body;

  const movie = await movieService.create(body);

  return res.json(movie);
}