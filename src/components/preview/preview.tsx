import React from "react"
import { Movie, PartialMovie } from "../../interfaces";
import { useQuery } from "@apollo/client";
import { GET_MOVIE } from "../../queries";
import { Button } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import "./preview.scss";

interface Props {
  preview?: PartialMovie,
  setPreview: React.Dispatch<React.SetStateAction<PartialMovie | undefined>>,
  nominations: PartialMovie[],
  setNominations: React.Dispatch<React.SetStateAction<PartialMovie[]>>
}

export default function Preview({ preview, setPreview, nominations, setNominations }: Props) {
  const { data } = useQuery(GET_MOVIE, { variables: { id: preview?.imdbID } });

  if (!preview || !data) return (<></>);

  const movie = data.movie as Movie;

  const nominationsId = nominations.map(nomination => nomination.imdbID);
  const addNomination = (newNomination: PartialMovie) => {
    if (!nominations) {
      setNominations([newNomination]);
    } else {
      setNominations([...nominations, newNomination]);
    }
  }

  return (
    <div key={movie.imdbID} className="preview">
      <Button onClick={() => setPreview(undefined)} startIcon={<ChevronLeftIcon />} className="preview__back"> Back </Button>
      {movie.Poster !== "N/A" &&
        <img className="preview__poster" src={movie.Poster} alt={`${movie.Title} poster`} />
      }
      <h2 className="preview__title">{movie.Title}</h2>
      <p className="preview__info">{movie.Year}{movie.Genre ? ` ‧ ${movie.Genre}` : ''}{movie.Runtime !== "N/A" ? ` ‧ ${movie.Runtime}` : ''} </p>

      <div className="preview__nominate">
        {(nominationsId?.includes(movie.imdbID) || nominations.length >= 5)
          ? <Button variant="contained" color="primary" disabled>Nominate</Button>
          : <Button variant="contained" color="primary" onClick={() => addNomination(preview)}>Nominate</Button>
        }
      </div>

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
    </div>
  )
}