import '../css/global.css'

import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface TemplateProps {
    children: React.ReactElement | React.ReactElement[]
    height?: string

    // if true, add function that tabs can be added manually
    manualAdd?: boolean
}


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

    // if(children.type === React) {
    //
    // }

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


    return (
        <div style={{minHeight: '30px', height: tabHeight + 'px'}} className={"w-full"}>
            <BrowserRouter>
                <div className={"h-full inline-block"}>

                    { newChildren }

                </div>

                {
                    manualAdd &&
                    <div className={"inline-block cursor-pointer hover:text-blue-400"}>
                        <FontAwesomeIcon icon={ faPlus } size="xl"></FontAwesomeIcon>
                    </div>

                }

            </BrowserRouter>
        </div>
    )
}