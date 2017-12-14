import React from 'react';

import '../css/app.css';
import Square from "../objects/square.jsx";
import SmallCircle from "../objects/circle-small.jsx";

export default class MapFactory {
    static build(data){
        switch(data.name) {
            case 'side':
                return  data.rooms.map((room) => MapFactory.getSubDiv(room));
            case 'main':
                return  data.rooms.map((room) => MapFactory.getSubDiv(room));
            case 'exhibit':
                let exhibitRooms = data.rooms.map((room) => MapFactory.getSubDiv(room));
                return  <div className="circle-small-container">
                    {exhibitRooms}
                </div>
            case 'meeting':
                let meetingRooms = data.rooms.map((room) => MapFactory.getSubDiv(room));
                return <div className="square-container">
                    {meetingRooms}
                </div>
        }
    }

    static getSubDiv(data){
        switch(data.shape) {
            case 'arc':
                return  <div className={data.shape}>{data.abbreviation}</div>
            case 'bigCircle':
                return  <div className="circle-big"><h2>{data.abbreviation}</h2></div>
            case 'smallCircle':
                return  <SmallCircle color={data.color} value={data.abbreviation}/>
            case 'square':
                return <Square color={data.color} value={data.abbreviation}/>
        }
    }
}