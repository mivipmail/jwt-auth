import React from 'react'
import {Field, reduxForm} from "redux-form";
import {email, password, required} from "../../utils/validators";
import {Input} from "../common/FormControls/FormControls";
import {withAPI} from "../../hocs/withAPI";
import {useNavigate} from "react-router-dom";
import {withToken} from "../../hocs/withToken";
import {useState} from "react";

const Login = (props) => {
    const [httpError, setHttpError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = (formData) => {
        axios.post('/api/auth/login', formData).then(res => {
            localStorage.setItem('access_token', res.data.access_token)
            navigate('/');
        }).catch(error => {
            setHttpError(error.response.data.error)
        })
    }

    return (
        <div className="container pt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Авторизация</div>

                        <div className="card-body">

                            { httpError &&
                                <p className="text-center text-danger">{httpError}</p>
                            }

                            <LoginFormRedux onSubmit={handleSubmit}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LoginForm = (props) => {
    const {handleSubmit} = props

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">E-mail</label>
                <div className="col-md-6">
                    <Field id="email" name="email" component={Input}
                           validate={[required, email]}
                           type="text" className="form-control"/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="password"
                       className="col-md-4 col-form-label text-md-end">Пароль</label>
                <div className="col-md-6">
                    <Field id="password" name="password" component={Input}
                           validate={[required]}
                           type="password" className="form-control"/>
                </div>
            </div>
            <div className="row mb-0">
                <div className="col-md-8 offset-md-4">
                    <button className="btn btn-primary">
                        Войти
                    </button>
                </div>
            </div>
        </form>
    )
}

const LoginFormRedux = reduxForm({
    form: 'login'
})(LoginForm)

export default withToken(withAPI(Login))
