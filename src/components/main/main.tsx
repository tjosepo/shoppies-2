import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Background, NominationList, SearchBar, SearchResults, Preview, NominationButton } from '..';
import { SEARCH_TITLE } from '../../queries';
import { PartialMovie, SearchData } from '../../interfaces';
import './main.scss';

function Main() {
  const [searchMovie, { loading, data }] = useLazyQuery<SearchData>(SEARCH_TITLE);
  const [preview, setPreview] = useState<PartialMovie>();
  const [nominations, setNominations] = useState<PartialMovie[]>([]);
  const [isNominationListOpened, setNominationListOpened] = useState<Boolean>(false);

  useEffect(() => setPreview(undefined), [data]);

  return (
    <div className={`shoppies-container${isNominationListOpened ? ' nomination-list-opened' : ''}`}>
      <main className="main">
        <nav className="nav">
          <SearchBar {...{ searchMovie }} />
          <NominationButton {...{ setNominationListOpened }} />
        </nav>
        <div className={`grid${preview ? ' grid--preview' : ''}`}>
          <SearchResults {...{ preview, setPreview, loading, data, nominations, setNominations }} />
          <Preview {...{ preview, setPreview, nominations, setNominations }} />
        </div>
        <Background {...{ preview }} />
      </main>
      <NominationList {...{ nominations, setNominations, setNominationListOpened }} />
    </div>
  )
}

export default Main;