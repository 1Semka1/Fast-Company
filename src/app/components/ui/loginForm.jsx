import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import TextField from '../common/form/textField'
import { validatorConfig } from '../../utils/validatorConfig'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthError, logIn } from '../../store/users'

const LoginForm = () => {
    const history = useHistory()

    const [data, setData] = useState({ email: '', password: '', stayOn: false })
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const loginError = useSelector(getAuthError())

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            ...target
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/'

        dispatch(logIn({ payload: data, redirect }))
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const { email, password, stayOn } = data
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label={'Электронная почта'}
                name={'email'}
                value={email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label={'Пароль'}
                type={'password'}
                name={'password'}
                value={password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField value={stayOn} onChange={handleChange} name="stayOn">
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                type="Submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    )
}

export default LoginForm
