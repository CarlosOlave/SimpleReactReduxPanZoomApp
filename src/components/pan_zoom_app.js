import React, { Component } from 'react';
import eventListener from 'eventlistener';

import PanZoomPanel from './pan_zoom_panel';
import ZoomToolbar from './zoom_toolbar';

class PanZoomApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    render() {
        const { width, height } = this.state;
        const style = {
            width: width,
            height: height
        };

        return (
            <div style={ style } className="app-container">
                <PanZoomPanel dimension={ Math.min(width, height) } />
                <ZoomToolbar />
            </div>
        );
    }

    componentDidMount() {
        this.updateWindowDimensions();
        eventListener.add(window, 'resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        eventListener.remove(window, 'resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        const { innerWidth, innerHeight } = window;

        this.setState({
            width: innerWidth,
            height: innerHeight
        });
    }
}

export default PanZoomApp;