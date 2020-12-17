import React from 'react';
import { Movie } from '../../interfaces';
import './background.scss';

interface Props {
  preview?: Movie
}

function Background({ preview }: Props) {
  return (
    <>
      {preview &&
        <div className="background">
          <div className="background__color" />
          <img className="background__image" src={preview?.Poster} />
        </div>
      }
    </>
  )
}

export default Background;