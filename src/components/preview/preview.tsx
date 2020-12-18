import React from "react"
import { Movie } from "../../interfaces";
import "./preview.scss";
import { useQuery } from "@apollo/client";
import { GET_MOVIE } from "../../queries";

interface Props {
  movie: Movie,
  selected: Boolean
}

export default function Preview({ movie, selected }: Props) {
  const { data } = useQuery(GET_MOVIE, { variables: { id: movie?.imdbID } });

  if (!movie || !data) return (<></>);

  return (
    <div className={`preview--wrapper${selected ? ' selected' : ''}`}>
      <div className="preview">
        {movie.Poster !== "N/A" &&
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
        }
        <h2 className="preview__title">{movie.Title}</h2>
        <p className="preview__year">{movie.Year}</p>
        {data.movie.Plot !== "N/A" &&
          <p className="plot">{data.movie.Plot}</p>
        }
      </div>
    </div>
  )
}