import React from "react";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const withToken = (Component) => {
    function TokenComponent(props) {
        const currentRoute = useLocation().pathname
        const navigate = useNavigate()
        const access_token = localStorage.getItem('access_token')

        useEffect(() => {
            if(!access_token &&
                currentRoute !== '/login' && currentRoute !== '/register')
                navigate('/login')
            else if(access_token) {
                if(currentRoute === '/login' || currentRoute === '/register')
                    navigate('/')
            }
        }, [])

        return <Component {...props} />
    }

    return TokenComponent
}
