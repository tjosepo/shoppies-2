import React from "react"
import { Movie } from "../../interfaces";
import "./preview.scss";
import { useQuery } from "@apollo/client";
import { GET_MOVIE } from "../../queries";

export default function Preview({ movie }: { movie: Movie }) {
  const { data } = useQuery(GET_MOVIE, { variables: { id: movie?.imdbID } });

  if (!movie || !data) return (<></>);
  console.log(data);

  return (
    <div className="preview">
      {movie.Poster !== "N/A" &&
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
      }
      <h2>{movie.Title}</h2>
      <p style={{ color: "white", fontWeight: 200 }}>{movie.Year}</p>
      {data.movie.Plot !== "N/A" &&
        <p className="plot">{data.movie.Plot}</p>
      }
    </div>
  )
}