import React from 'react';
import { QueryLazyOptions } from '@apollo/client';
import { Input, FormControl, InputAdornment } from '@material-ui/core/';
import { Search } from '@material-ui/icons';
import { debounce } from 'lodash';
import './search-bar.scss';

interface Props {
  searchMovie: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void
}

function SearchBar({ searchMovie }: Props) {
  const onChange = (e: React.ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const title = input.value.trim();
    if (title.length < 1) return;
    search(title);
  }

  const search = debounce((title: string) => {
    searchMovie({ variables: { search: title } })
  }, 300, { trailing: true });


  return (
    <FormControl>
      <Input
        id="SearchBar"
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
        placeholder="Search"
      />
    </FormControl>
  )
}

export default SearchBar;