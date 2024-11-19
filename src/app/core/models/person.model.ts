export interface Person {
  id: number;
  name: string;
  eyeColor: string;
  hairColor: string;
  weight: number;
  location: Location;
  nationality: string;
  owner_id: number;
}

export interface Location {
  name: string;
  x: number;
  y: number;
}

export enum Color {
  BLACK = 'BLACK',
  ORANGE = 'ORANGE',
  RED = 'RED',
  WHITE = 'WHITE',
  YELLOW = 'YELLOW',
}

export enum Country {
  SPAIN = 'SPAIN',
  VATICAN = 'VATICAN',
  ITALY = 'ITALY',
  THAILAND = 'THAILAND',
  JAPAN = 'JAPAN',
}
