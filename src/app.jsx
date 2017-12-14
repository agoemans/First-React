import React from 'react';

import Map from './objects/map.jsx';
import Legend from './objects/legend.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <h1>Venue Map</h1>
                <div>
                    <Map />
                </div>
                <div>
                    <Legend />
                </div>
            </div>
        );
    }
}