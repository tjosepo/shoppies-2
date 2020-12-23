import React, { useState } from 'react';
import { Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Portal, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { PartialMovie } from '../../interfaces';
import './nomination-list.scss';
import Close from '@material-ui/icons/Close';

interface Props {
  nominations: PartialMovie[],
  setNominations: React.Dispatch<React.SetStateAction<PartialMovie[]>>,
  setNominationListOpened: React.Dispatch<React.SetStateAction<Boolean>>,
  setPreview: React.Dispatch<React.SetStateAction<PartialMovie | undefined>>
}

function NominationList({ nominations, setNominations, setNominationListOpened, setPreview }: Props) {
  const [notification, setNotification] = useState(false);

  const removeNomination = (removedNomination: PartialMovie) => {
    const filteredNominations = nominations.filter(nominations => nominations.imdbID !== removedNomination.imdbID);
    setNominations(filteredNominations)
  }

  const previewNomination = (nomination: PartialMovie) => {
    setPreview(nomination);
    setNominationListOpened(false);
  }

  const share = () => {
    const baseurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    if (nominations.length > 0) {
      const ids = nominations.map(nomination => nomination.imdbID);
      const query = `?n=${ids.join(',')}`;
      navigator.clipboard.writeText(`${baseurl}${query}`);
    } else {
      navigator.clipboard.writeText(baseurl);
    }
    setNotification(true)
  }

  return (
    <div className="nomination-list">
      <nav className="nav">
        <div className="close-btn">
          <IconButton onClick={() => setNominationListOpened(false)}><CloseIcon /></IconButton>
        </div>
        <Button variant="contained" color="secondary" onClick={() => share()}>Share</Button>
      </nav>
      <div className="nomination">
        <h2>Nomination List</h2>
        <p>Here is the list of movies you have nominated.</p>

        <List className="list">
          {nominations.map((movie: PartialMovie) =>
            <div key={movie.imdbID}>
              <ListItem
                button onClick={() => previewNomination(movie)}
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

      <Portal>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={notification}
          autoHideDuration={6000}
          onClose={() => setNotification(false)}
          message="Link copied to clipboard"
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setNotification(false)}>
              <Close fontSize="small" />
            </IconButton>
          }
        />
      </Portal>
    </div>
  )
}

export default NominationList;