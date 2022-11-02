import '../css/global.css'

import React, {useEffect, useState} from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import TabDialog from './dialog/tabDialog'
import Tab from "./Tab";

interface TemplateProps {
    children: React.ReactElement | React.ReactElement[]
    height?: string

    // if true, add function that tabs can be added manually
    manualAdd?: boolean
}

let aaa:number =0;
export default ( props: TemplateProps) => {


    const children = props.children;

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

    const newChildren = React.Children.map(children, (child, index) => {

        const id = child.props.id;
        const isEnabled = enable === id;


        if(React.isValidElement(child)) {

            return React.cloneElement(child as React.ReactElement,{
                setEnable: setEnable,
                isEnable: isEnabled
            });

        }
    });

    tabs = newChildren;


    useEffect(() => {
        // setTabs(newChildren);
    });

    const createTab = (event: React.MouseEvent, id: string, name: string, url: string) => {

        newChildren.push(React.createElement('Tab', {
            id: id,
            name: name,
            url: url,
            setEnable: setEnable,
            isEnable: false
        },''));

// setTabs(newChildren)
    }


    return (
        <div style={{minHeight: '30px', height: tabHeight + 'px'}} className={"w-full"}>
            <BrowserRouter>
                <div className={"h-full inline-block"}>

                    { tabs }

                </div>

                {
                    manualAdd &&
                    <div className={"inline-block cursor-pointer hover:text-blue-400"}>
                        <FontAwesomeIcon icon={ faPlus } size="xl"></FontAwesomeIcon>
                    </div>

                }

            </BrowserRouter>

           <div className={"inline-block absolute right-1/2 top-1/3"}>
               <TabDialog clickEvent={createTab}></TabDialog>
           </div>
        </div>
    )
}
