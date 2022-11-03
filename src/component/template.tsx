import '../css/global.css'

import React, { useEffect, useState, useRef } from "react";
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

let tabList: React.ReactElement[] ;

export default ( props: TemplateProps) => {

    useEffect(() => {
    });

    const removeTab = (event: React.MouseEvent, id: string) => {
        const targetTabList = getTargetList();
        const removedList = targetTabList.filter(tab => tab.props.id != id);

        tabList = removedList;

        setTabs(removedList);
    }

    // useStates that would change dialog inputs
    let [alertId, changeAlertId] = useState<boolean>(false);
    let [alertName, changeAlertName] = useState<boolean>(false);
    let [alertUrl, changeAlertUrl] = useState<boolean>(false);

    let [dialogDisplay, setDialogDisplay] = useState<string>('hidden');

    let tmpId: boolean;
    let tmpName: boolean;
    let tmpUrl: boolean;

    // dynamically add new tab
    const createTab = (event: React.MouseEvent, id: string, name: string, url: string) => {
        const targetTabList = getTargetList();

        // check if id is already exist
        const isExist = targetTabList.filter(tab => tab.props.id === id).length > 0 ? true: false;

        // check if input has text
        tmpId = !id ? true : false;
        tmpName = !name ? true : false;
        tmpUrl = !url ? true : false;

        if(id && isExist) {
            tmpId = true;
        }

        changeAlertId(tmpId);
        changeAlertName(tmpName);
        changeAlertUrl(tmpUrl);

        if(tmpId || tmpName || tmpUrl) {
            return false;
        }

        const prop = {
            id: id,
            name: name,
            url: url,
            setEnable: setEnable,
            isEnable: false,
            remove: removeTab
        };

        const newTab :React.ReactElement = Tab(prop);


        targetTabList.push(newTab)

        const newTabList = React.Children.map(targetTabList, tab => tab);
        tabList = newTabList;

        setTabs(newTabList)

        setDialogDisplay('hidden')

        return true;
    }


    // draw tabs with 'newChildren' for first render,
    // draw tabs with tabList which has dynamically added or removed tabs after first render
    const getTargetList = () => {
        return tabList == undefined? newChildren : tabList;
    }

    const children = props.children;

    let tabHeight;
    let manualAdd;

    if(!props.height) {
        tabHeight = '30'
    }

    if(!manualAdd) {
        manualAdd = true;
    }

    const [enable, setEnable] = useState<string>('');

    const newChildren = React.Children.map(children, (child, index) => {

        const id = child.props.id;
        const isEnabled = enable === id;


        if(React.isValidElement(child)) {

            return React.cloneElement(child as React.ReactElement,{
                setEnable: setEnable,
                isEnable: isEnabled,
                remove: removeTab
            });

        }
    });

    let [tabs, setTabs] = useState<any>(getTargetList());


    return (
        <div style={{minHeight: '30px', height: tabHeight + 'px'}} className={"w-full"}>
            <BrowserRouter>
                <div className={"h-full inline-block"}>

                    { tabs }

                </div>

                {
                    manualAdd &&
                    <div className={"inline-block cursor-pointer hover:text-blue-400"}>
                        <FontAwesomeIcon icon={ faPlus } size="xl" onClick={(event) => setDialogDisplay('')}></FontAwesomeIcon>
                    </div>

                }

            </BrowserRouter>

           <div className={ dialogDisplay + " absolute right-1/2 top-1/3"}>
               <TabDialog idAlert={ alertId } nameAlert={ alertName } urlAlert={ alertUrl } clickEvent={ createTab }></TabDialog>
           </div>
        </div>
    )
}
