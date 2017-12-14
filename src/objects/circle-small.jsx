import React from 'react';

export default class SmallCircle extends React.Component {
    render() {
        return (
            <div className="circle-small" style={{backgroundColor: this.props.color}}>
                <h4> {this.props.value} </h4>
            </div>
        );
    }
}