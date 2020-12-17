export interface Movie {
  Title: string,
  Year: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Plot: string,
  Poster: string,
  imdbID: string
}

export interface SearchData {
  result: {
    Response: "True" | "False"
    Search?: Movie[]
    totalResults: string
  }
}