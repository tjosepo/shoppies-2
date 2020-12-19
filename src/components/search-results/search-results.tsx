import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, CircularProgress } from '@material-ui/core';
import { PartialMovie, SearchData } from '../../interfaces';
import './search-results.scss';

interface Props {
  preview?: PartialMovie,
  setPreview: React.Dispatch<React.SetStateAction<PartialMovie | undefined>>
  loading: boolean,
  data: SearchData | undefined
}

function SearchResults({ preview, setPreview, loading, data }: Props) {
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
                  <Button tabIndex={preview ? -1 : 0}>Nominate</Button>
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