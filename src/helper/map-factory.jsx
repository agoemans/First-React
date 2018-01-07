import React from 'react';

import '../css/app.css';
import Square from "../objects/square.jsx";
import SmallCircle from "../objects/circle-small.jsx";

export default class MapFactory {

    static getWrapperClass(name) {
        switch (name) {
            case 'side':
            case 'main':
                return "";
            case 'exhibit':
                return "circle-small-container";
            case 'meeting':
                return "square-container";
        }
    }

    static build(data){
        const className = MapFactory.getWrapperClass(data.name);
        const exhibitRooms = data.rooms.map((room) => MapFactory.getSubDiv(room));
        return  <div key={data.name} className={className}>
                {exhibitRooms}
            </div>;
    }

    static getSubDiv(data){
        switch(data.shape) {
            case 'arc':
                return  <div key={data.id} className={data.shape}>{data.abbreviation}</div>
            case 'bigCircle':
                return  <div key={data.id} className="circle-big"><h2>{data.abbreviation}</h2></div>
            case 'smallCircle':
                return  <SmallCircle key={data.id} color={data.color} value={data.abbreviation}/>
            case 'square':
                return <Square key={data.id} color={data.color} value={data.abbreviation}/>
        }
    }
}