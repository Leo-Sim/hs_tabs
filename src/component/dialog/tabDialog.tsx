
import React, { useState } from "react";


interface dialogProps {
    clickEvent: Function
}

export default (props: dialogProps) => {

    const width = 'w-36'

    let [name, setName] = useState<string>();
    let [url, setUrl] = useState<string>()
    let [id, setId] = useState<string>()

    return (
        <div>
            <div>
                <input type="text" className={"border border-gray-400 border-solid rounded-md shadow-lg"} placeholder="Tab ID" value={ id } onChange={(event) => setId(event.target.value)}/>
            </div>
            <div>
                <input type="text" className={"border border-gray-400 border-solid rounded-md shadow-lg"} placeholder="Name" value={ name } onChange={(event) => setName(event.target.value)}/>
            </div>
            <div>
                <input type="text" className={"border border-gray-400 border-solid rounded-md shadow-lg"} placeholder="URL" value={ url } onChange={(event) => setUrl(event.target.value)}/>
            </div>
            <div className={"cursor-pointer"} onClick={event => props.clickEvent(event, id, name, url)}>create</div>
        </div>
    )
}


