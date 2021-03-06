import React from 'react';
import PropTypes from 'prop-types';

import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import AnalyticsTabsHeader from './AnalyticsTabsHeader/AnalyticsTabsHeader';
import AnalyticsTabsPanel from './AnalyticsTabsPanel/AnalyticsTabsPanel';
import DeleteVisualizationWarning from '../DeleteVisualizationWarning/DeleteVisualizationWarning';

const AnalyticsTabs = ({
  visualizations,
  dashboards,
  deleteVisualization,
  deleteDashboard,
  isLoading,
  openModal,
  moveToCollection,
  collectionId,
}) => {
  const [value, setValue] = React.useState(0);
  const [isWarningVisible, setIsWarningVisible] = React.useState(false);
  const [visualizationIdToDelete, setVisualizationIdToDelete] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onWarningOpen = () => {
    setIsWarningVisible(true);
  };

  const onWarningClose = () => {
    setIsWarningVisible(false);
  };

  const deleteItem = (id) => () => {
    deleteVisualization(id);
  };

  const removeVisualization = (id) => () => {
    const isVisualizationBelongsToDashboard = dashboards.filter((dashboard) => {
      return dashboard.Visualizations.filter((visualization) => visualization.id === id).length !== 0;
    });
    if (isVisualizationBelongsToDashboard.length) {
      setVisualizationIdToDelete(id);
      onWarningOpen();
    } else {
      deleteVisualization(id);
    }
  };

  const removeDashboard = (id) => () => {
    deleteDashboard(id);
  };

  const sortData = (data) => {
    return data.sort((elem, nextElem) => {
      return new Date(nextElem.updatedAt) - new Date(elem.updatedAt);
    });
  };

  return (
    <>
      <DeleteVisualizationWarning
        isVisible={isWarningVisible}
        onClose={onWarningClose}
        deleteVisualization={deleteVisualization}
        visualizationId={visualizationIdToDelete}
      />
      <AnalyticsTabsHeader value={value} onChange={handleChange}>
        <Tab label="Everything" id="analytics-tab-everything" />
        <Tab label="Dashboards" id="analytics-tab-dashboards" />
        <Tab label="Visualizations" id="analytics-tab-visualizations" />
      </AnalyticsTabsHeader>
      {isLoading ? (
        <CircularProgress size={40} left={-20} top={-40} style={{ marginLeft: '50%', marginTop: '50%' }} />
      ) : (
        <>
          <AnalyticsTabsPanel
            value={value}
            index={0}
            deleteItem={deleteItem}
            deleteVisualization={removeVisualization}
            deleteDashboard={removeDashboard}
            data={sortData([...visualizations, ...dashboards])}
            openModal={openModal}
            moveToCollection={moveToCollection}
            collectionId={collectionId}
          />
          <AnalyticsTabsPanel
            value={value}
            index={1}
            deleteVisualization={removeVisualization}
            deleteDashboard={removeDashboard}
            data={sortData(dashboards)}
            openModal={openModal}
            moveToCollection={moveToCollection}
            collectionId={collectionId}
          />
          <AnalyticsTabsPanel
            value={value}
            index={2}
            deleteVisualization={removeVisualization}
            deleteDashboard={removeDashboard}
            data={sortData(visualizations)}
            openModal={openModal}
            moveToCollection={moveToCollection}
            collectionId={collectionId}
          />
        </>
      )}
    </>
  );
};

AnalyticsTabs.propTypes = {
  visualizations: PropTypes.array,
  dashboards: PropTypes.array,
  isLoading: PropTypes.bool,
  deleteVisualization: PropTypes.func,
  deleteDashboard: PropTypes.func,
  openModal: PropTypes.func,
  moveToCollection: PropTypes.func,
  collectionId: PropTypes.string,
};

export default AnalyticsTabs;
