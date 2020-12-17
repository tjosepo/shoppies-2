import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Background, NominationList, SearchBar, SearchResults } from '..';
import { SEARCH_TITLE } from '../../queries';
import { Movie, SearchData } from '../../interfaces';
import './main.scss';

function Main() {
  const [searchMovie, { loading, data }] = useLazyQuery<SearchData>(SEARCH_TITLE);
  const [preview, setPreview] = useState<Movie>();

  return (
    <main className="main">
      <nav className="nav">
        <SearchBar {...{ searchMovie }} />
        <NominationList />
      </nav>
      <SearchResults {...{ preview, setPreview, loading, data }} />
      <Background {...{ preview }} />
    </main>
  )
}

export default Main;