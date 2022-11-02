import '../css/global.css'

import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";


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
    remove?: Function
}

export default (props: TapProps) => {

    const clickRemove = (event: React.MouseEvent, id: string) => {
        if(props.remove) {
            props.remove(event, id);
        }
    }

    // class for activated tab.
    const tabClass = [width, bgColor, display, margin, text, border].join(' ');
    // class for not activated tabs.
    const disabledClass = [width, tabClass, display, margin, textDisabled, border].join(' ');
    return(

            <div id={props.id} className={ props.isEnable? tabClass : disabledClass } onClick={() => {props.setEnable(props.id)}}>
                <Link to={props.url} className={ hover }>{ props.name } </Link>
                <FontAwesomeIcon icon={ faX } size="2xs" className={ 'cursor-pointer' } style={{color: '#dc2626'}} onClick={event => clickRemove(event, props.id)}></FontAwesomeIcon>
            </div>
    )
}