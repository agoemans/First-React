import React from 'react';

export default class LegendItem extends React.Component {
    render() {
        return (
            <div className="legend-item">
                <div className="legend-box" style={{backgroundColor:this.props.color}}></div>
                <div className="legend-value" >{this.props.value}</div>
            </div>
        );
    }
}