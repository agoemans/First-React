import React from 'react';

export default class Square extends React.Component {
    render() {
        return (
            <div className="square" style={{backgroundColor: this.props.color}}>
                <h3> {this.props.value} </h3>
            </div>
        );
    }
}