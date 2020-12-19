import React from 'react';
import { IconButton } from '@material-ui/core';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import './nomination-list.scss';

function NominationList() {
  return (
    <div className="nomination-list--button">
      <IconButton><TurnedInNotIcon /></IconButton>
    </div>
  )
}

export default NominationList;