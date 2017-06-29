export const ZOOM_CLICK = 'zoom_click';
export const PAN_UPDATE = 'pan_update';

export function zoomClick(data = {}) {
    return {
        type: ZOOM_CLICK,
        payload: data
    }
}

export function panUpdate(data = {}) {
    return {
        type: PAN_UPDATE,
        payload: data
    };
}