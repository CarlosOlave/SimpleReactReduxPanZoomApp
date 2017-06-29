import React, { Component } from 'react';
import { connect } from 'react-redux';

import { zoomClick } from '../actions';

class ZoomToolbar extends Component {
    render(ReactElement, DOMElement, callback) {
        const { isZoomIn } = this.props;
        const zoomInClass = isZoomIn ? 'disable' : '';
        const zoomOutClass = isZoomIn ? '' : 'disable';

        return(
            <div className="zoom-controls">
                <button
                    className={ `zoom-button zoom-in-icon ${ zoomInClass }` }
                    onClick={ this.zoomInClick.bind(this) }
                    disabled={ isZoomIn }
                />
                <button
                    className={ `zoom-button zoom-out-icon ${ zoomOutClass }` }
                    onClick={ this.zoomOutClick.bind(this) }
                    disabled={ !isZoomIn }
                />
            </div>
        );
    }

    zoomInClick(event) {
        if (this.props.isZoomIn) {
            return;
        }

        // Call redux action -> reducer to update zoom state
        this.props.zoomClick({ isZoomIn: true });
    }

    zoomOutClick(event) {
        if (!this.props.isZoomIn) {
            return;
        }

        // Call redux action -> reducer to update zoom state
        this.props.zoomClick({ isZoomIn: false });
    }
}

function mapStateToProps({ data }) {
    const { isZoomIn } = data;

    return {
        isZoomIn: isZoomIn
    };
}

export default connect(mapStateToProps, { zoomClick })(ZoomToolbar);