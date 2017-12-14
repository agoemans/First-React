import React from 'react';

import '../css/app.css';
import {mapData} from "./map-data.jsx";

import MapFactory from "../helper/map-factory.jsx";

export default class Map extends React.Component {
    render() {
        const renderedItems = mapData.map((data) => MapFactory.build(data));
        return (
            <div className="map">
                {renderedItems}
            </div>
        );
    }
}