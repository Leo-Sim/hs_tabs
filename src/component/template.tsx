import '../css/global.css'

import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";

interface TemplateProps {
    children: React.ReactElement | React.ReactElement[]
    height?: string
}

export default ( props: TemplateProps) => {

    let [selectedTab, changeTab] = useState();

    if(!props.height) {
        props.height = '30'
    }

    return (
        <div style={{minHeight: '30px', height: props.height + 'px'}} className={"w-full"}>
            <BrowserRouter>
                <div className={"h-full"}>

                    { props.children }

                </div>
                <div>
                    ddd
                </div>
            </BrowserRouter>
        </div>
    )
}