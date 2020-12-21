import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, CircularProgress } from '@material-ui/core';
import { PartialMovie, SearchData } from '../../interfaces';
import './search-results.scss';

interface Props {
  preview?: PartialMovie,
  setPreview: React.Dispatch<React.SetStateAction<PartialMovie | undefined>>
  loading: boolean,
  data: SearchData | undefined
  nominations: PartialMovie[],
  setNominations: React.Dispatch<React.SetStateAction<PartialMovie[]>>
}

function SearchResults({ preview, setPreview, loading, data, nominations, setNominations }: Props) {
  const movies = data?.result.Search;

  if (loading) {
    return (
      <div className="search-results">
        <h2>Search</h2>
        <div className="loading">
          <CircularProgress />
        </div>
      </div>
    )
  }

  const nominationsId = nominations.map(nomination => nomination.imdbID);
  const addNomination = (newNomination: PartialMovie) => {
    if (!nominations) {
      setNominations([newNomination]);
    } else {
      setNominations([...nominations, newNomination]);
    }
  }

  return (
    <div className="search-results">
      <h2>Search</h2>
      <p>Please, search for a movie you would like to nominate to The Shoppies Award.</p>
      {movies &&
        <List className="list">
          {movies.map((movie: PartialMovie) =>
            <div key={movie.imdbID}>
              <ListItem tabIndex={preview ? -1 : 0}
                key={movie.imdbID} button className="list-item" onClick={() => setPreview(movie)}>
                <ListItemText primary={`${movie.Title} (${movie.Year})`} style={{ paddingRight: 60 }} />
                <ListItemSecondaryAction>
                  {(nominationsId.includes(movie.imdbID) || nominations.length >= 5)
                    ? <Button disabled>Nominate</Button>
                    : <Button onClick={() => addNomination(movie)}>Nominate</Button>
                  }
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          )}
        </List>
      }
    </div>
  )
}

export default SearchResults;