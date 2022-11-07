import '../css/global.css'

import React, { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";


interface TemplateProps {
    children: React.ReactElement | React.ReactElement[]
    height?: string,

    // num of  range -> 5~10
    numOfShow?: number

}

let globalTabs: React.ReactElement[];

const validate = (props: TemplateProps) => {

    if(props.numOfShow && (props.numOfShow < 5 || props.numOfShow > 10)) {
        console.error('property \'numOfShow\' should be between 5-10');
    }
}

export default ( props: TemplateProps) => {

    useEffect(() => {
    });

    validate(props);

    let numOfShow = props.numOfShow? props.numOfShow : 10;

    const children = globalTabs == undefined? props.children : globalTabs;

    let tabHeight;

    if(!props.height) {
        tabHeight = '30'
    }

    // determine if 'children' is array. set default active tab.
    let initEanble: string;
    if(children && Array.isArray(children)) {
       initEanble = children[0].props.id;
    } else {
        initEanble = children.props.id;
    }

    const tabCount: number = React.Children.count(children);

    let showArrow: boolean = false;
    if(numOfShow < tabCount) {
        showArrow = true;
    }

    // show some tabs and hide the rest
    let tabsToShow: string[] = [];
    if(showArrow && children && Array.isArray(children)) {
        let i = 0;
        tabsToShow = children.filter(tab => numOfShow > i++).map((tab, index) => tab.props.id);
    }

    const [enable, setEnable] = useState<string>(initEanble);
    const [showTabIds, setShowTabIds] = useState<string[]>();

    let newChildren = React.Children.map(children, (child, index) => {

        const id = child.props.id;
        const isEnabled = enable === id;


        if(React.isValidElement(child)) {

            return React.cloneElement(child as React.ReactElement,{
                setEnable: setEnable,
                isEnable: isEnabled,
                isHidden: showArrow && !tabsToShow.includes(id)
            });
        }
    });

    globalTabs = newChildren;

    const moveLeft = () => {

        moveSelectedTab(globalTabs, false);
        const first: any = globalTabs.shift();
        globalTabs.push(first);
    };

    const moveRight = () => {
        const last: any = globalTabs.pop();
        globalTabs.unshift(last);
        moveSelectedTab(globalTabs, true);
    }


    const moveSelectedTab = (tabs: React.ReactElement[], direction: boolean) => {

        let selected;

        const curSelected: string = enable;
        let curSelectedIndex: number = 0;

        tabs.forEach((tab, index) => {
            if(curSelected === tab.props.id) {
                curSelectedIndex = index;
            }
        })
        //right
        if(direction) {
            selected = tabs[curSelectedIndex - 1].props.id;
        }
        //left
        else {
            selected = tabs[curSelectedIndex + 1].props.id
        }

        setEnable(selected);
    }


    return (
        <div style={{minHeight: '30px', height: tabHeight + 'px'}} className={"w-full"}>
            <FontAwesomeIcon icon={ faArrowLeft } size="lg" className={"mr-2 cursor-pointer " + (showArrow? '' : ' hidden')} onClick={ moveLeft }></FontAwesomeIcon>
                <div className={"h-full inline-block"} >
                    { globalTabs }
                </div>
            <FontAwesomeIcon icon={ faArrowRight } size="lg" className={"cursor-pointer " + (showArrow? '' : 'hidden')} onClick={ moveRight }></FontAwesomeIcon>
        </div>
    )
}


