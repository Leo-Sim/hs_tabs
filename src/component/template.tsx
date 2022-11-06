import '../css/global.css'

import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter } from "react-router-dom";


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

    const children = globalTabs == undefined? props.children : globalTabs;

    let tabHeight;


    if(!props.height) {
        tabHeight = '30'
    }

    let initEanble: string;
    if(children && Array.isArray(children)) {
       initEanble = children[0].props.id;
    } else {
        initEanble = children.props.id;
    }


    const [enable, setEnable] = useState<string>(initEanble);

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
    const moveLeft = () => {
        const first: any = globalTabs.shift();
        globalTabs.push(first);
        moveSelectedTab(globalTabs, false);
        // increaseCount(count + 1);
    };

    const moveRight = () => {
        const last: any = globalTabs.pop();
        globalTabs.unshift(last);
        moveSelectedTab(globalTabs, true);
        // increaseCount(count + 1);
    }


    const moveSelectedTab = (tabs: React.ReactElement[], direction: boolean) => {

        let selected;

        const curSelected: string = enable;
        let curSelectedIndex: number = 0;

        tabs.forEach((tab, index) => {
            if(curSelected === tab.props.id) {
                curSelectedIndex = index;
                // navigate(tab.props.url);

            }
        })

        //right
        if(direction) {
            selected = tabs[curSelectedIndex - 1].props.id
        }
        //left
        else {
            selected = tabs[curSelectedIndex + 1].props.id
        }


        setEnable(selected);
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


