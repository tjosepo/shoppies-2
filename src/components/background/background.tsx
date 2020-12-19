import React from 'react';
import { PartialMovie } from '../../interfaces';
import './background.scss';

interface Props {
  preview?: PartialMovie,
}

function Background({ preview }: Props) {
  return (
    <>
      {preview &&
        <div className="background">
          <div className="background__color" />
          <img className="background__image" src={preview?.Poster} alt="Movie poster" />
        </div>
      }
    </>
  )
}

export default Background;