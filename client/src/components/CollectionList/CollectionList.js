import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';
import CollectionListItem from './CollectionListItem';
import { DEFAULT_COLLECTIONS } from '../../constants';

const CollectionList = ({ openModal, collections }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.title}>Collections</div>
      <div className={classes.collectionItemContainer}>
        {collections.map((collection) => {
          return (
            collection.name !== DEFAULT_COLLECTIONS && (
              <Link to={`/collections/${collection.id}`} key={collection.id} className={classes.link}>
                <CollectionListItem name={collection.name} id={collection.id} />
              </Link>
            )
          );
        })}
        <div aria-hidden="true" className={classes.addCollection} onClick={() => openModal({ type: 'Add collection' })}>
          <AddIcon />
          New collections
        </div>
      </div>
    </>
  );
};

CollectionList.propTypes = {
  openModal: PropTypes.func,
  collections: PropTypes.array,
};
export default CollectionList;
