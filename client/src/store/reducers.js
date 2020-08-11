import { combineReducers } from 'redux';
import loginReducer from '../containers/LoginPageContainer/reducer';
import viewVisualizationReducer from '../containers/ViewVisualizationContainer/reducer';
import visualizationsListReducer from '../containers/VisualizationsListContainer/reducer';

export default combineReducers({
  currentUser: loginReducer,
  visualizations: visualizationsListReducer,
  currentVisualization: viewVisualizationReducer,
});
