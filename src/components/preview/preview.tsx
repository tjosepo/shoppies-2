import React from "react"
import { Movie, PartialMovie } from "../../interfaces";
import { useQuery } from "@apollo/client";
import { GET_MOVIE } from "../../queries";
import { Button } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import "./preview.scss";

interface Props {
  partialMovie?: PartialMovie,
  setPreview: React.Dispatch<React.SetStateAction<PartialMovie | undefined>>
}

export default function Preview({ partialMovie, setPreview }: Props) {
  const { data } = useQuery(GET_MOVIE, { variables: { id: partialMovie?.imdbID } });

  if (!partialMovie || !data) return (<></>);

  const movie = data.movie as Movie;

  return (
    <div key={movie.imdbID} className="preview">
      <Button onClick={() => setPreview(undefined)} startIcon={<ChevronLeftIcon />} className="preview__back"> Back </Button>
      {movie.Poster !== "N/A" &&
        <img className="preview__poster" src={movie.Poster} alt={`${movie.Title} poster`} />
      }
      <h2 className="preview__title">{movie.Title}</h2>
      <p className="preview__info">{movie.Year}{movie.Genre ? ` ‧ ${movie.Genre}` : ''}{movie.Runtime !== "N/A" ? ` ‧ ${movie.Runtime}` : ''} </p>

      {(movie.imdbRating !== "N/A" || movie.Metascore !== "N/A") &&
        <div className="preview__ratings">
          {movie.imdbRating !== "N/A" &&
            <p>
              <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noreferrer">
                {movie.imdbRating}/10 <br />IMDb
          </a>
            </p>
          }

          {movie.Metascore !== "N/A" &&
            <p>{movie.Metascore}% <br />Metascore</p>
          }
        </div>
      }

      {movie.Plot !== "N/A" &&
        <p className="preview__plot">{movie.Plot}</p>
      }

      <div className="preview__nominate">
        <Button variant="contained" color="primary">Nominate</Button>
      </div>
    </div>
  )
}