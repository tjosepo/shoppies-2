import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Background, NominationList, SearchBar, SearchResults, Preview } from '..';
import { SEARCH_TITLE } from '../../queries';
import { PartialMovie, SearchData } from '../../interfaces';
import './main.scss';

function Main() {
  const [searchMovie, { loading, data }] = useLazyQuery<SearchData>(SEARCH_TITLE);
  const [preview, setPreview] = useState<PartialMovie>();

  useEffect(() => setPreview(undefined), [data]);

  return (
    <main className="main">
      <nav className="nav">
        <SearchBar {...{ searchMovie }} />
        <NominationList />
      </nav>
      <div className={`grid${preview ? ' grid--preview' : ''}`}>
        <SearchResults {...{ preview, setPreview, loading, data }} />
        <Preview partialMovie={preview} {...{ setPreview }} />
      </div>

      <Background {...{ preview }} />
    </main>
  )
}

export default Main;