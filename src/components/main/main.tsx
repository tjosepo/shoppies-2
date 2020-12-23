import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Background, NominationList, SearchBar, SearchResults, Preview, NominationButton } from '..';
import Storage from '../../storage';
import { SEARCH_TITLE } from '../../queries';
import { PartialMovie, SearchData } from '../../interfaces';
import './main.scss';
import { Portal, Snackbar, IconButton } from '@material-ui/core';
import Close from '@material-ui/icons/Close';

function Main() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchMovie, { loading, data }] = useLazyQuery<SearchData>(SEARCH_TITLE);
  const [preview, setPreview] = useState<PartialMovie>();
  const [nominations, setNominations] = useState<PartialMovie[]>([]);
  const [isNominationListOpened, setNominationListOpened] = useState<Boolean>(false);
  const [notification, setNotification] = useState(false);

  useEffect(() => setPreview(undefined), [data]);
  useEffect(() => (nominations.length === 5) ? setNotification(true) : undefined, [nominations])

  return (
    <div className={`shoppies-container${isNominationListOpened ? ' nomination-list-opened' : ''}`}>
      <main className="main">
        <nav className="nav">
          <SearchBar {...{ searchMovie, setSearchQuery }} />
          <NominationButton {...{ nominations, setNominationListOpened }} />
        </nav>
        <div className={`grid${preview ? ' grid--preview' : ''}`}>
          <SearchResults {...{ searchQuery, preview, setPreview, loading, data, nominations, setNominations }} />
          {preview && <Preview {...{ preview, setPreview, nominations, setNominations }} />}
        </div>
        <Background {...{ preview }} />
        <button className="modal-bg" onClick={() => setNominationListOpened(false)} />
      </main>
      <NominationList {...{ nominations, setNominations, setNominationListOpened, setPreview }} />

      <Storage {...{ nominations, setNominations }} />
      <Portal>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={notification}
          autoHideDuration={6000}
          onClose={() => setNotification(false)}
          message="All 5 movies have been nominated!"
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

export default Main;