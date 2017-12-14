import React from 'react';
import LegendItem from './legend-item.jsx';

export default class Legend extends React.Component {
    renderSquare(name, color) {
        return <LegendItem color={color} value={name}/>;
    }
    render() {
        return (
            <div className="legend">
                <div className="legend-col-one">
                    {this.renderSquare('Side meeting room')}
                    {this.renderSquare('Conference room', 'blue')}
                    {this.renderSquare('North Hall Exhibit', 'red')}
                </div>
                <div className="legend-col-two">
                    {this.renderSquare('North Midway Exhibit', 'red')}
                    {this.renderSquare('South Hall Exhibit', 'red')}
                    {this.renderSquare('Amsterdam Meeting room', 'darkolivegreen')}
                </div>
                <div className="legend-col-three">
                    {this.renderSquare('London Meeting room', 'darkolivegreen')}
                    {this.renderSquare('NYC Meeting room', 'darkolivegreen')}
                </div>
            </div>
        );
    }
}