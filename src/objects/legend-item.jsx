import React from 'react';

import anime from 'animejs';

export default class LegendItem extends React.Component {
    animate(){
        // let cssSelector = anime({
        //     targets: '.legend-item',
        //     translateX: 250
        // });
    }

    componentDidMount() {
        this.animate();
    }

    render() {
        return (
            <div className="legend-item">
                <div className="legend-box" style={{backgroundColor:this.props.color}} >

                </div>
                <div className="legend-value" >{this.props.value}</div>
            </div>
        );
    }
}