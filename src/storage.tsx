import { useApolloClient } from '@apollo/client';
import React, { useEffect } from 'react';
import { PartialMovie } from './interfaces';
import { GET_MOVIE } from './queries';

interface Props {
  nominations: PartialMovie[],
  setNominations: React.Dispatch<React.SetStateAction<PartialMovie[]>>
}

function Storage({ nominations, setNominations }: Props) {
  const client = useApolloClient();

  const saveNominationList = (nominationsList: PartialMovie[]) => {
    const req = indexedDB.open('Shoppies');

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('nominations')) {
        db.createObjectStore('nominations', { keyPath: 'imdbID' });
      }
    }

    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction('nominations', 'readwrite');
      const store = tx.objectStore('nominations');
      store.clear();

      nominationsList.forEach((nomination) => {
        store.add(nomination);
      });
    }
  }

  useEffect(() => {
    const loadNominationList = () => {
      const req = indexedDB.open('Shoppies', 1);

      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('nominations')) {
          db.createObjectStore('nominations', { keyPath: 'imdbID' });
        }
      }

      req.onsuccess = () => {
        const db = req.result;
        const tx = db.transaction('nominations', 'readonly');
        const store = tx.objectStore('nominations');
        const data = store.getAll();

        data.onsuccess = () => {
          const nominationList = data.result as PartialMovie[];
          setNominations(nominationList);
        }
      }
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has("n")) {
      const newNominationList: PartialMovie[] = [];
      const param = urlParams.get("n") as string;
      const baseurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
      window.history.replaceState({}, document.title, baseurl);
      const ids = param.split(",");

      ids.forEach((id) => {
        client.query({ query: GET_MOVIE, variables: { id: id } }).then(response => {
          const movie = response.data.movie as PartialMovie;
          newNominationList.push(movie);

          if (newNominationList.length === ids.length) {
            setNominations(newNominationList);
          }
        });
      });
    } else {
      loadNominationList();
    }
  }, [setNominations, client])

  useEffect(() => {
    if (nominations.length > 0) saveNominationList(nominations);
  }, [nominations]);

  return null;
}

export default Storage;