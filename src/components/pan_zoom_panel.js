import React, { Component } from 'react';
import eventListener from 'eventlistener';
import { connect } from 'react-redux';

import { zoomClick, panUpdate } from '../actions';

const src = 'https://bonobos-prod-s3.imgix.net/products/18158/original/SHIRT_ShortSleeve_ZebraRun_JetBlack_hero1.jpg?h=7000&w=7000';

class PanZoomPanel extends Component {
    constructor(props) {
        super(props);

        // Properties that don't trigger rendering
        this.panCoordinates = {
            startX: 0,
            startY: 0,
            PrevX: 0,
            PrevY: 0
        };
        this.isStartPan = false;
        this.isPanActive = false;
    }

    render(ReactElement, DOMElement, callback) {
        const m = this.getMatrix();
        const { dimension } = this.props;

        // Put together the transformation from zoom in/out and panning
        const style = {
            width: dimension,
            height: dimension,
            transform: `matrix(${ m[0]},${m[1]},${m[2]},${m[3]},${m[4]},${m[5] })`
        };

        return(
            <div
                ref="panel"
                className="image-panel"
                style={ style }
                onTouchStart={ this.panStart.bind(this) }
                onTouchEnd={ this.panEnd.bind(this) }
                onMouseDown={ this.panStart.bind(this) }
                onMouseUp={ this.panEnd.bind(this) }
            >
                <img className="image" src={ src } />
            </div>
        );
    }

    getMatrix() {
        const { isZoomIn, deltaX, deltaY } = this.props;
        const m = isZoomIn ? [3, 0, 0, 3, 0, 0] : [1, 0, 0, 1, 0, 0];

        if (deltaX && deltaY) {
            m[4] = deltaX;
            m[5] = deltaY;
        }

        return m;
    }

    getCurrentXY(e) {
        return {
            currentX: typeof e.pageX === 'undefined' ? e.changedTouches[0].pageX : e.pageX,
            currentY: typeof e.pageY === 'undefined' ? e.changedTouches[0].pageY : e.pageY
        }
    }

    panStart(e) {
        if (!this.props.isZoomIn) {
            return;
        }

        e.preventDefault();

        const type = e.type === 'touchstart' ? 'touchmove' : 'mousemove';
        const currentXY = this.getCurrentXY(e);
        const { currentX, currentY } = currentXY;
        const m = this.getMatrix();

        eventListener.add(window, type, this.panMove.bind(this));
        this.isStartPan = true;

        // Save starting coordinates to be used while panning
        this.panCoordinates = {
            startX: currentX,
            startY: currentY,
            prevX: m[4],
            prevY: m[5]
        };
    }

    panMove(e) {
        if (!this.isStartPan) {
            return;
        }

        // Calculate new panning x and y translation
        const currentXY = this.getCurrentXY(e);
        const { currentX, currentY } = currentXY;
        const { startX, startY, prevX, prevY } = this.panCoordinates;
        const { clientWidth, clientHeight } = this.refs.panel;
        const deltaX = Math.max(Math.min(prevX + currentX - startX, clientWidth), -(clientWidth));
        const deltaY = Math.max(Math.min(prevY + currentY - startY, clientHeight), -(clientHeight));

        this.isPanActive = true;

        // Call redux action -> reducer to update panning state
        this.props.panUpdate({
            deltaX: deltaX,
            deltaY: deltaY
        });
    }

    panEnd(e) {
        e.preventDefault();

        const type = e.type === 'touchend' ? 'touchmove' : 'mousemove';

        eventListener.remove(window, type, this.panMove .bind(this));

        // Call redux action -> reducer to update zoom state
        if (!this.isPanActive) {
            const { isZoomIn } = this.props;

            this.props.zoomClick({
                isZoomIn: !isZoomIn
            });
        }

        this.isPanActive = false;
        this.isStartPan = false;
    }
}

function mapStateToProps({ data }) {
    const { deltaX, deltaY, isZoomIn } = data;

    return {
        deltaX: deltaX,
        deltaY: deltaY,
        isZoomIn: isZoomIn
    };
}

export default connect(mapStateToProps, { zoomClick, panUpdate })(PanZoomPanel);