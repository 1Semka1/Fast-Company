import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import { validator } from '../../../utils/validator'
import { useHistory } from 'react-router-dom'
import { validatorConfig } from '../../../utils/validatorConfig'

const EditUser = ({ userId }) => {
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    })
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState([])
    const [errors, setErrors] = useState({})
    useEffect(() => {
        api.users.getById(userId).then((data) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: data.profession._id,
                qualities: data.qualities.map((qual) => ({
                    label: qual.name,
                    value: qual._id
                }))
            }))
        )
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfessions(professionsList)
        })
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }))
            setQualities(qualitiesList)
        })
    }, [])
    useEffect(() => {
        validate()
    }, [data])
    const history = useHistory()

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
        const { profession, qualities } = data
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then(() => history.replace(`/users/${userId}`))
    }

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label }
            }
        }
    }
    const getQualities = (elements) => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    })
                }
            }
        }
        return qualitiesArray
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    if (professions.length && qualities.length) {
        return (
            <form onSubmit={handleSubmit}>
                <TextField
                    label={'Имя'}
                    name={'name'}
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label={'Электронная почта'}
                    name={'email'}
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
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
                <button
                    type="Submit"
                    disabled={!isValid}
                    className="btn btn-primary w-100 mx-auto"
                >
                    Обновить
                </button>
            </form>
        )
    } else {
        return <h1>Loading</h1>
    }
}

EditUser.propTypes = {
    userId: PropTypes.string.isRequired
}

export default EditUser
