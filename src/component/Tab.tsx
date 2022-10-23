import '../css/global.css'

import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

let bgColor = 'white';
let display = 'inline-block';
let margin = 'mr-2';

// text color, text size, text align
let text = 'text-blue-400 text-lg text-center';

let width = 'w-20';
let border = 'border-t border-r border-l border-gray-400 border-solid rounded-tl-md rounded-tr-md shadow-lg';

interface TapProps {
    id: string,
    name: string,
    url: string
}

export default (props: TapProps) => {


    const tabClass = [width, bgColor, display, margin, text, border].join(" ");
    return(
        <div id={props.id} className={ tabClass } onClick={() => {}}>
           <Link to={props.url}>{ props.name }</Link>
        </div>
    )
}