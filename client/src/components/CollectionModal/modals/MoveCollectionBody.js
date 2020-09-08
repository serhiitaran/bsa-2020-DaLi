import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import CollectionsIcon from '@material-ui/icons/Collections';
import StarIcon from '@material-ui/icons/Star';
import { useStyles } from '../styles';
import { PERSONAL_COLLECTIONS } from '../../constants';

const AddUserBody = ({
  closeModal,
  collections,
  dashboardToMove,
  visualizationToMove,
  moveToCollection,
  currentCollection,
}) => {
  const classes = useStyles();
  const [activeCollection, setActiveCollection] = useState();
  const handleClick = (e) => {
    e.preventDefault();
    setActiveCollection(e.currentTarget.id);
  };

  const handleSubmit = () => {
    if (dashboardToMove) {
      moveToCollection({
        dashboardId: dashboardToMove.id,
        collection: activeCollection,
        collectionId: currentCollection.id,
      });
    } else {
      moveToCollection({
        visualizationId: visualizationToMove.id,
        collection: activeCollection,
        collectionId: currentCollection.id,
      });
    }
  };

  return (
    <div className={classes.modalContainer} id={`${currentCollection?.id} moveCollectionModal`}>
      <div className={classes.modalHeader}>
        <h2 className={classes.modalTitle}>
          {dashboardToMove
            ? `Move "${dashboardToMove.name}" dashboard?`
            : `Move "${visualizationToMove.name}" visualization?`}
        </h2>
        <CloseIcon className={classes.closeIcon} onClick={closeModal} />
      </div>
      <form className={classes.addCollectionModalForm}>
        <input
          id={`${currentCollection?.id} moveCollectionModal-name`}
          className={classes.modalInput}
          name="name"
          type="text"
          placeholder="My new fantastic collections"
        />
        <div>
          {collections.map(({ name, id }) => {
            return (
              currentCollection.id !== id && (
                <div
                  className={activeCollection === id ? classes.active : classes.collectionItem}
                  id={id}
                  onClick={handleClick}
                  key={id}
                  aria-hidden="true"
                >
                  {name === PERSONAL_COLLECTIONS ? (
                    <StarIcon className={classes.icon} />
                  ) : (
                    <CollectionsIcon className={classes.icon} />
                  )}
                  <span>{name}</span>
                </div>
              )
            );
          })}
        </div>
        <div className={classes.buttonContainer}>
          <Button
            onClick={closeModal}
            variant="outlined"
            style={{ textTransform: 'none', fontSize: 12 }}
            id={`${currentCollection?.id} moveCollectionModalButton-cancel`}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            className={classes.moveButton}
            onClick={handleSubmit}
            style={{ textTransform: 'none', fontSize: 12, marginLeft: 5 }}
            id={`${currentCollection?.id} moveCollectionModalButton-move`}
          >
            Move
          </Button>
        </div>
      </form>
    </div>
  );
};

AddUserBody.propTypes = {
  closeModal: PropTypes.func,
  collections: PropTypes.array,
  dashboardToMove: PropTypes.object,
  visualizationToMove: PropTypes.object,
  moveToCollection: PropTypes.func,
  currentCollection: PropTypes.object,
};

export default AddUserBody;
