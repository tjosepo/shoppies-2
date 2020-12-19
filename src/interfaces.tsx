export interface PartialMovie {
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
  imdbID: string
}

export interface Movie extends PartialMovie {
  Runtime: string,
  Genre: string,
  Director: string,
  Plot: string,
  Metascore: string,
  imdbRating: string
}

export interface SearchData {
  result: {
    Response: "True" | "False"
    Search?: PartialMovie[]
    totalResults: string
  }
}