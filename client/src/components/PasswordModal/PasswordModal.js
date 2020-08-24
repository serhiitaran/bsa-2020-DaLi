/* eslint-disable */

import React, { useState} from 'react';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';

const PasswordModal = ({ password, clearPassword, isReset, hideModal, resetPassword, user }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(Boolean(password));

  const handleClose = () => {
    setOpen(false);
    clearPassword();
    hideModal();
  };

  const handleReset = () => {
    hideModal();
    setOpen(true);
    resetPassword(user.id);
  };

  const handleShowPassword = () => {
    inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password'
  };

  const copyPassword = () => {
    const listener = (e) => {
      e.clipboardData.setData('text/plain', password);
      e.preventDefault();
    };

    document.addEventListener('copy', listener); 
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  };

  console.log(user);

  const resetModalBody = user && (
    <div className={classes.modalContainer}>
      <div className={classes.modalHeader}>
        <h2 className={classes.modalTitle}>{`Reset ${user.firstName} ${user.lastName}'s password?`}</h2>
        <CloseIcon className={classes.closeIcon} onClick={handleClose} />
      </div>
      <div>Are you sure you want to do this?</div>
      <Button className={classes.resetButton} onClick={handleReset}>
        Reset password
      </Button>
    </div>
  );

  const passwordModalBody = (
    <div className={classes.modalContainer}>
      <div className={classes.modalHeader}>
        <h2 className={classes.modalTitle}>New password</h2>
        <CloseIcon className={classes.closeIcon} onClick={handleClose} />
      </div>
      <div>Here’s a temporary password they can use to log in and then change their password.</div>
      <div className={classes.passwordContainer}>
        <div className={classes.passwordContainerTitle}>
          <span>TEMPORARY PASSWORD</span>
        </div>
        <input type="password" value={password} readOnly/>
        <div className={classes.passwordIcons}>
          <span onClick={handleShowPassword}>Show</span>
          <EventNoteIcon className={classes.passwordIcon} onClick={copyPassword} />
        </div>
      </div>
      <Button className={classes.doneButton} onClick={handleClose}>
        Done
      </Button>
    </div>
  );

  return (
    <Modal
      className={classes.modal}
      open={open || !!isReset}
      onClose={handleClose}
      disableBackdropClick={isReset ? false : true}
    >
      {isReset ? resetModalBody : passwordModalBody}
    </Modal>
  );
};

export default PasswordModal;
