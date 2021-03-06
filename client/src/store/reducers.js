import { combineReducers } from 'redux';
import loginReducer from '../containers/LoginPageContainer/reducer';
import viewVisualizationReducer from '../containers/ViewVisualizationContainer/reducer';
import usersListReducer from '../containers/PeoplePageContainer/reducer';
import databasesListReducer from '../containers/DatabasesPageContainer/reducer';
import accountSettingsReducer from '../containers/AccountSettingsContainer/reducer';
import analyticsReducer from '../containers/AnalyticsContainer/reducer';
import currentDashboardReducer from '../containers/DashboardContainer/reducer';
import permissionsReducer from '../containers/PermissionsContainer/reducer';
import datasetsListReducer from '../containers/DataSourcesDatasetsContainer/reducer';
import userGroupsReducer from '../containers/UserGroupsPageContainer/reducer';
import connectionDatabaseReducer from '../containers/ConnectionDatabaseContainer/reducer';

export default combineReducers({
  currentUser: loginReducer,
  analytics: analyticsReducer,
  currentVisualization: viewVisualizationReducer,
  admin: combineReducers({
    people: usersListReducer,
    groups: userGroupsReducer,
    databases: databasesListReducer,
    connectionDatabase: connectionDatabaseReducer,
    permissions: permissionsReducer,
  }),
  accountSettingsReducer,
  currentDashboard: currentDashboardReducer,
  datasets: datasetsListReducer,
});
