import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const withAPI = (Component) => {
    function APIComponent(props) {
        const API = axios.create()
        const navigate = useNavigate()


        API.interceptors.request.use(config => {
            const access_token = localStorage.getItem('access_token')
            if(access_token)
                config.headers.authorization = `Bearer ${access_token}`

            return config
        }, error => {})


        API.interceptors.response.use({}, error => {
            if(error.response.data.message === 'Token has expired') {
                const access_token = localStorage.getItem('access_token')
                return axios.post('/api/auth/refresh', {}, {
                    headers: {
                        'authorization': `Bearer ${access_token}`
                    }
                }).then(res => {
                    localStorage.setItem('access_token', res.data.access_token)
                    const access_token = res.data.access_token

                    error.config.headers.authorization = `Bearer ${access_token}`

                    return API.request(error.config)
                })
            }
            else if(error.response.status === 401)
                navigate('/login')
        })


        return <Component {...props} API={API} />
    }

    return APIComponent
}
