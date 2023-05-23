import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import TextField from '../common/form/textField'
import { validatorConfig } from '../../utils/validatorConfig'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
    const history = useHistory()

    const [data, setData] = useState({ email: '', password: '', stayOn: false })
    const [errors, setErrors] = useState({})

    const { signIn } = useAuth()

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            ...target
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return

        try {
            await signIn(data)
            history.push('/')
        } catch (error) {
            setErrors(error)
        }
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
