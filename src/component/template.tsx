import '../css/global.css'

import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Link } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";




interface TemplateProps {
    children: React.ReactElement | React.ReactElement[]
    height?: string,
    // max num of tabs
    max?: number,
    // num of  range -> 5~10
    numOfDisplay?: number

}

let globalTabs: React.ReactElement[];

const validate = (props: TemplateProps) => {
    if(props.max && props.max < 1) {
        console.error('property \'max\' can\'t be lower than 1');
    }
    if(props.numOfDisplay && (props.numOfDisplay < 5 || props.numOfDisplay > 10)) {
        console.error('property \'numOfDisplay\' should be between 5-10');
    }
}

export default ( props: TemplateProps) => {

    useEffect(() => {
    });

    validate(props);

    // const children = props.children;

    const children = globalTabs == undefined? props.children : globalTabs;

    let tabHeight;
    let manualAdd;

    if(!props.height) {
        tabHeight = '30'
    }

    if(!manualAdd) {
        manualAdd = true;
    }
    let [tabs, setTabs] = useState<any>();
    const [enable, setEnable] = useState<string>('');

    let newChildren = React.Children.map(children, (child, index) => {

        const id = child.props.id;
        const isEnabled = enable === id;


        if(React.isValidElement(child)) {

            return React.cloneElement(child as React.ReactElement,{
                setEnable: setEnable,
                isEnable: isEnabled
            });
        }
    });

    globalTabs = newChildren;


    let [animation, setAnimation] = useState<string>()
    let [count, increaseCount] = useState<number>(0)
    const moveRight = () => {
        const first: any = globalTabs.shift();
        globalTabs.push(first);
        increaseCount(count + 1);
    };

    const moveLeft = () => {
        const last: any = globalTabs.pop();
        globalTabs.unshift(last);
        increaseCount(count + 1);
    }


    return (
        <div style={{minHeight: '30px', height: tabHeight + 'px'}} className={"w-full"}>


            <FontAwesomeIcon icon={ faArrowLeft } size="lg" className={"mr-2 cursor-pointer "} onClick={ moveLeft }></FontAwesomeIcon>
            <BrowserRouter>
                <div className={"h-full inline-block animation1"} >
                    { globalTabs }
                </div>

            </BrowserRouter>
            <FontAwesomeIcon icon={ faArrowRight } size="lg" className={"cursor-pointer "} onClick={ moveRight }></FontAwesomeIcon>

        </div>
    )
}

const moveSelectedTab = (globalTabs: React.ReactElement[], direction: boolean) => {
    //right
    if(direction) {

    }
    //left
    else {

    }
}
