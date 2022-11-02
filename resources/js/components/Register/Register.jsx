import React, {useCallback, useEffect, useState} from 'react'
import {Field, formValueSelector, reduxForm} from "redux-form";
import {email, password, passwordConfirmCreator, required} from "../../utils/validators";
import {Input} from "../common/FormControls/FormControls";
import {connect} from "react-redux";
import {withToken} from "../../hocs/withToken";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [httpError, setHttpError] = useState(null)
    const navigate = useNavigate()

    const onSubmit = (formData) => {
        axios.post('/api/users', formData)
            .then(res => {
                localStorage.setItem('access_token', res.data.data.access_token)
                navigate('/')
            })
            .catch(error => {
                setHttpError(error.response.data.error)
            })
    }

    return (
        <div className="container pt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Регистрация</div>

                        <div className="card-body">

                            { httpError &&
                                <p className="text-center text-danger">{httpError}</p>
                            }

                            <RegisterFormRedux onSubmit={onSubmit}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RegisterForm = (props) => {
    const {handleSubmit, passwordValue} = props

    const passwordConfirm = useCallback(passwordConfirmCreator(passwordValue), [passwordValue])

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Ваше имя</label>
                <div className="col-md-6">
                    <Field id="name" name="name" component={Input}
                           validate={[required]}
                           type="text" className="form-control"/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">E-mail</label>
                <div className="col-md-6">
                    <Field id="email" name="email" component={Input}
                           validate={[required, email]}
                           type="email" className="form-control"/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="password"
                       className="col-md-4 col-form-label text-md-end">Пароль</label>
                <div className="col-md-6">
                    <Field id="password" name="password" component={Input}
                           validate={[required, password]}
                           type="password" className="form-control"/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="password_confirmation"
                       className="col-md-4 col-form-label text-md-end">Подтверждение пароля</label>
                <div className="col-md-6">
                    <Field id="password_confirmation" name="password_confirmation" component={Input}
                           validate={[required, password, passwordConfirm]}
                           type="password" className="form-control"/>
                </div>
            </div>
            <div className="row mb-0">
                <div className="col-md-8 offset-md-4">
                    <button className="btn btn-primary">
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </form>
    )
}

let RegisterFormRedux = reduxForm({
    form: 'register'
})(RegisterForm)

const selector = formValueSelector('register')

RegisterFormRedux = connect(state => {
    const passwordValue = selector(state, 'password')
    return {
        passwordValue,
    }
})(RegisterFormRedux)

export default withToken(Register)
