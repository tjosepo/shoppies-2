import React from 'react';
import { IconButton } from '@material-ui/core';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import './nomination-button.scss';

interface Props {
  setNominationListOpened: React.Dispatch<React.SetStateAction<Boolean>>
}

function NominationButton({ setNominationListOpened }: Props) {
  return (
    <div className="nomination-button">
      <IconButton onClick={() => setNominationListOpened(true)}><TurnedInNotIcon /></IconButton>
    </div>
  )
}

export default NominationButton;