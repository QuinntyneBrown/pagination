﻿export const translateXY = (element: HTMLElement, x: number, y: number):any =>     
    ["-moz-transform", "-webkit-transform", "-ms-transform", "-transform"]
        .map(prop => element.style[prop] = `translate(${x}px, ${y}px)`);
