import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import { validatorConfig } from '../../utils/validatorConfig'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities } from '../../store/qualities'
import { getProfessions } from '../../store/professions'
import { signUp } from '../../store/users'

const RegisterForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        name: '',
        qualities: [],
        licence: false
    })
    const [errors, setErrors] = useState({})

    const professions = useSelector(getProfessions())
    const qualities = useSelector(getQualities())

    const dispatch = useDispatch()

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
        const newData = {
            ...data,
            qualities: data.qualities.map((qual) => qual.value)
        }
        dispatch(signUp(newData))
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Выберите вашу профессию"
                defaultOption="Выберите..."
                name="profession"
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
            />
            <RadioField
                label="Выберите ваш пол"
                options={[
                    { name: 'Мужчина', value: 'male' },
                    { name: 'Женщина', value: 'female' }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                label="Выберите ваши качества"
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
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

export default RegisterForm
