import React from 'react';
import LegendItem from './legend-item.jsx';

import anime from 'animejs';
//https://codepen.io/juliangarnier/pen/gmOwJX

export default class Legend extends React.Component {
    constructor(){
        super();

        this.numberOfParticules = 30;
        this.pointerX = 160;
        this.pointerY = 160;
        this._tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
        this.colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

        //this.playAnimation = this.playAnimation.bind(this);

    }
    componentDidMount(){
        console.log(this.context);
        this.animation = anime({
            duration: Infinity,
            update: () => {
                this.context.clearRect(0, 0, 320, 320);
            }
        });

        let cssSelector = anime({
            targets: 'legend-col-one',
            translateY: 100
        });

        this.playAnimation();

    }

    renderSquare(name, color) {
        return <LegendItem color={color} value={name}/>;
    }

    updateCoords(e) {
        let cnv = document.getElementsByClassName('cnv');
        this.pointerX = 160;
        this.pointerY = 160;
    }

    setParticuleDirection(p) {
        var angle = anime.random(0, 360) * Math.PI / 180;
        var value = anime.random(100, 200);
        var radius = [-1, 1][anime.random(0, 1)] * value;
        return {
            x: p.x + radius * Math.cos(angle),
            y: p.y + radius * Math.sin(angle)
        }
    }

    createParticule(x, y) {
        let self = this;

        var p = {};
        p.x = x;
        p.y = y;
        p.color = this.colors[anime.random(0, this.colors.length - 1)];
        p.radius = anime.random(16, 32);
        p.endPos = this.setParticuleDirection(p);
        p.fallenY = 0;
        p.draw = function(p) {
            self.context.beginPath();
            self.context.arc(p.x, p.y + p.fallenY, p.radius, 0, 2 * Math.PI, true);
            self.context.fillStyle = p.color;
            self.context.fill();
        };
        return p;
    }

    createCircle(x, y) {
        let self = this;
        var p = {};
        p.x = x;
        p.y = y;
        p.fallenY = 0;
        p.color = '#FFF';
        p.radius = 0.1;
        p.alpha = .5;
        p.lineWidth = 6;
        p.draw = function(p) {
            self.context.globalAlpha = p.alpha;
            self.context.beginPath();
            self.context.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            self.context.lineWidth = p.lineWidth;
            self.context.strokeStyle = p.color;
            self.context.stroke();
            self.context.globalAlpha = 1;
        };
        return p;
    }

    renderParticule(anim) {
        for (var i = 0; i < anim.animatables.length; i++) {
            anim.animatables[i].target.draw(anim.animatables[i].target);
            //console.log(anim.animatables[i].target.fallenY, anim.animatables[i].target.radius);

        }
    }

    animateParticules(x, y) {
        console.log('animate particules');
        var circle = this.createCircle(x, y);
        var particules = [];
        for (var i = 0; i < this.numberOfParticules; i++) {
            particules.push(this.createParticule(x, y));
        }

        let particuleTimeLine = anime.timeline({
            loop: 3
            });

        particuleTimeLine.add({
            targets: particules,
            x: function(p) { return p.endPos.x; },
            y: function(p) { return p.endPos.y; },
            radius: 0.1,
            duration: 1500,
            easing: 'easeOutQuint',
            update: this.renderParticule,
            offset: 0
        })
            .add({
                targets: particules,
                fallenY: 250,
                duration: 1200,
                offset: 0,
                easing: 'easeInQuad'
            })
            .add({
                targets: circle,
                radius: anime.random(80, 160),
                lineWidth: 0,
                alpha: {
                    value: 0,
                    easing: 'linear',
                    duration: anime.random(600, 800),
                },
                duration: anime.random(1200, 1800),
                easing: 'easeOutExpo',
                update: this.renderParticule,
                offset: 0
            });
        // anime.timeline().add({
        //     targets: particules,
        //     x: function(p) { return p.endPos.x; },
        //     y: function(p) { return p.endPos.y; },
        //     radius: 0.1,
        //     duration: anime.random(1200, 1800),
        //     easing: 'easeOutExpo',
        //     update: this.renderParticule
        // })
        //     .add({
        //         targets: circle,
        //         radius: anime.random(80, 160),
        //         lineWidth: 0,
        //         alpha: {
        //             value: 0,
        //             easing: 'linear',
        //             duration: anime.random(600, 800),
        //         },
        //         duration: anime.random(1200, 1800),
        //         easing: 'easeOutExpo',
        //         update: this.renderParticule,
        //         offset: 0
        //     });
    }

    playAnimation(e) {
        console.log('click');
        this.animation.play();
        this.updateCoords(e);
        this.animateParticules(this.pointerX, this.pointerY);
    }

    render() {
        return (
            <div className="legend">
                <canvas className="cnv" ref={(c) => this.context = c.getContext('2d')} width={320} height={320} onClick={()=>this.playAnimation()}/>
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