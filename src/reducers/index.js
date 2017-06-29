import { combineReducers } from 'redux';
import { panZoomPanelReducer } from './pan_zoom_panel_reducer';

const rootReducer = combineReducers({
    data: panZoomPanelReducer
});

export default rootReducer;
