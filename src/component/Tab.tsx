import '../css/global.css'

import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

let bgColor = 'white';
let display = 'inline-block';
let margin = 'mr-2';

// text color, text size, text align
let text = 'text-blue-400 text-lg text-center';
let textDisabled = 'text-black text-lg text-center';
let hover = 'hover:text-blue-400';

let width = 'w-20';
let border = 'border-t border-r border-l border-gray-400 border-solid rounded-tl-md rounded-tr-md shadow-lg';


interface TapProps {
    id: string,
    name: string,
    url: string
    setEnable?: any,
    isEnable?: boolean
}

export default (props: TapProps) => {

    // class for activated tab.
    const tabClass = [width, bgColor, display, margin, text, border].join(' ');
    // class for not activated tabs.
    const disabledClass = [width, tabClass, display, margin, textDisabled, border, hover].join(' ');
    return(
        <div id={props.id} className={ props.isEnable? tabClass : disabledClass } onClick={() => {props.setEnable(props.id)}}>
           <Link to={props.url}>{ props.name } </Link>

        </div>
    )
}