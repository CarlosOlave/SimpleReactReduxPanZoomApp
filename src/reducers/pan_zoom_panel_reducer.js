import { ZOOM_CLICK, PAN_UPDATE } from '../actions';

export function panZoomPanelReducer(state = {}, action) {
    switch(action.type) {
        case ZOOM_CLICK: {
            const { isZoomIn } = action.payload;

            return {
                isZoomIn: isZoomIn
            };
        }
        case PAN_UPDATE: {
            const { deltaX, deltaY } = action.payload;

            return {
                deltaX: deltaX,
                deltaY: deltaY,
                isZoomIn: true
            };
        }
        default: {
            return {
                isZoomIn: false
            };
        }
    }
}
