import {Person} from './person.model';

export interface Movie {
  id: number
  name: string
  coordinates: Coordinates
  creationDate: Date
  oscarsCount: number
  budget: number
  totalBoxOffice: number
  mpaaRating: MpaaRating
  director: Person
  screenwriter: Person;
  operator: Person;
  length: number;
  goldenPalmCount: number;
  genre: MovieGenre;
  owner_id: number;
}

export interface Coordinates {
  id: number;
  x: number;
  y: number;
}

export enum MpaaRating {
  PG = "PG",
  PG_13 = "PG_13",
  R = "R",
  NC_17 = "NC_17",
}

export enum MovieGenre {
  ACTION = "ACTION",
  COMEDY = "COMEDY",
  FANTASY = "FANTASY",
}
