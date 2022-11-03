
import React, { useState } from "react";

interface dialogProps {
    idAlert: boolean
    nameAlert: boolean
    urlAlert: boolean
    showIdAlert?: boolean
    clickEvent: Function
}

export default (props: dialogProps) => {

    const width = 'w-36'

    let [name, setName] = useState<string>('');
    let [url, setUrl] = useState<string>('');
    let [id, setId] = useState<string>('');

    const normalCss = 'border border-gray-400';
    const alertCss = 'border-2 border-red-700';

    let idCSs = props.idAlert? alertCss : normalCss;
    let nameCss = props.nameAlert? alertCss : normalCss;
    let urlCss = props.urlAlert? alertCss : normalCss;


    const done = (event: React.MouseEvent, id: string, name: string, url: string) => {
        const result = props.clickEvent(event, id, name, url);

        if(result) {
            setName('');
            setId('');
            setUrl('');
        }
    }

    return (
        <div>
            <div>
                <input type="text" className={ idCSs + " border-solid rounded-md shadow-lg"} placeholder="Tab ID" value={ id } onChange={(event) => setId(event.target.value)}/>
            </div>
            <div>
                <input type="text" className={ nameCss + " border-solid rounded-md shadow-lg"} placeholder="Name" value={ name } onChange={(event) => setName(event.target.value)}/>
            </div>
            <div>
                <input type="text" className={ urlCss + " border-solid rounded-md shadow-lg"} placeholder="URL" value={ url } onChange={(event) => setUrl(event.target.value)}/>
            </div>
            <div className={"cursor-pointer"} onClick={event => done(event, id, name, url)}>create</div>
        </div>
    )
}


