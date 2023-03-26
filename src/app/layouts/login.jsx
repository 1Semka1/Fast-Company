import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'
import { validator } from '../utils/validator'

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    useEffect(() => {
        validate()
    }, [data])

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введён некорректно'
            }
        },
        password: {
            isRequired: { message: 'Пароль обязателен для заполнения' },
            isCapitalSymbol: {
                message: 'Пароль должен содержать минимум одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен содержать минимум одну цифру'
            },
            minLength: {
                message: 'Пароль должен содержать минимум 8 символов',
                value: 8
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const { email, password } = data
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Авторизация</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="email"
                            label={'Электронная почта'}
                            name={'email'}
                            value={email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            id="password"
                            label={'Пароль'}
                            type={'password'}
                            name={'password'}
                            value={password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            type="Submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
