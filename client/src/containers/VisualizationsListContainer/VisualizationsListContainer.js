import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getVisualizations, deleteVisualization, resetError } from './actions';
import VisualizationsList from '../../components/VisualizationsList/VisualizationsList';

const VisualizationsListContainer = ({
  visualizations,
  isLoading,
  getVisualizations,
  deleteVisualization,
  resetError,
}) => {
  useEffect(() => {
    getVisualizations();
    return () => {
      resetError();
    };
  }, [getVisualizations, resetError]);

  const deleteItem = (id) => () => {
    deleteVisualization(id);
  };

  return <VisualizationsList visualizations={visualizations} isLoading={isLoading} deleteItem={deleteItem} />;
};

VisualizationsListContainer.propTypes = {
  visualizations: PropTypes.array,
  isLoading: PropTypes.bool,
  getVisualizations: PropTypes.func,
  deleteVisualization: PropTypes.func,
  resetError: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    visualizations: state.visualizations.visualizations,
    isLoading: state.visualizations.isLoading,
  };
};

export default connect(mapStateToProps, { getVisualizations, deleteVisualization, resetError })(
  VisualizationsListContainer
);
