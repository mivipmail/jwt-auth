import React, {useEffect, useState} from 'react'
import {withAPI} from "../../hocs/withAPI";
import {withToken} from "../../hocs/withToken";
import {compose} from "@reduxjs/toolkit";

const Welcome = (props) => {
    const [name, setName] = useState(null)

    useEffect(() => {
        props.API.post('/api/auth/me', {}).then(res => {
            setName(res.data.name);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="m-5 p-5 text-center">
            {name &&
                <h1>Здравствуйте, {name}</h1>
            }
        </div>
    )
}

export default compose(
    withAPI,
    withToken,
)(Welcome)
