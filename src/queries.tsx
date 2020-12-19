import { gql } from "@apollo/client";

export const GET_MOVIE = gql`
  query GET_MOVIE {
    movie(t: $title, i: $id) @rest(path: "/?apikey=${process.env.REACT_APP_OMBD_KEY}&type=movie&{args}") {
      Title
      Year
      imdbID
      Type
      Poster
      Plot
      Genre
      Runtime
      Director
      Metascore
      imdbRating
    }
  }
`

export const SEARCH_TITLE = gql`
  query SEARCH {
    result(s: $search) @rest(path: "/?apikey=${process.env.REACT_APP_OMBD_KEY}&type=movie&{args}") {
      Search {
        Title
        Year
        imdbID
        Type
        Poster
      }
    }
  }
`