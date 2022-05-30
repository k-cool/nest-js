import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    } else return movie;
  }

  create(movieData) {
    const lengthOfMovies = this.movies.length;
    this.movies.push({
      id: lengthOfMovies === 0 ? 1 : this.movies[lengthOfMovies - 1].id + 1,
      ...movieData,
    });
  }

  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }

  deleteOne(id: string): void {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }
}
