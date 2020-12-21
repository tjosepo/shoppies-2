import React from 'react';
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { PartialMovie } from '../../interfaces';
import './nomination-list.scss';

interface Props {
  nominations: PartialMovie[],
  setNominations: React.Dispatch<React.SetStateAction<PartialMovie[]>>,
  setNominationListOpened: React.Dispatch<React.SetStateAction<Boolean>>
}

function NominationList({ nominations, setNominations, setNominationListOpened }: Props) {

  const removeNomination = (removedNomination: PartialMovie) => {
    const filteredNominations = nominations.filter(nominations => nominations.imdbID !== removedNomination.imdbID);
    setNominations(filteredNominations)
  }

  return (
    <div className="nomination-list">
      <nav className="nav">
        <div className="close-btn">
          <IconButton onClick={() => setNominationListOpened(false)}><CloseIcon /></IconButton>
        </div>
      </nav>
      <div className="nomination">
        <h2>Nomination List</h2>
        <p>Here is the list of movies you have nominated.</p>

        <List className="list">
          {nominations.map((movie: PartialMovie) =>
            <div key={movie.imdbID}>
              <ListItem
                key={movie.imdbID} className="list-item">
                <ListItemText primary={`${movie.Title} (${movie.Year})`} style={{ paddingRight: 60 }} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => removeNomination(movie)}><CloseIcon /></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          )}
        </List>
      </div>
    </div>
  )
}

export default NominationList;