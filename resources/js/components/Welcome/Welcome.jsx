import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {withAPI} from "../../hocs/withAPI";
import {withToken} from "../../hocs/withToken";

const Welcome = (props) => {
    const [name, setName] = useState(null)

    useEffect(() => {
        props.API.post('/api/auth/me', {}).then(res => {
            setName(res.data.name);
        }).catch(error => {
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

export default withToken(withAPI(Welcome))
