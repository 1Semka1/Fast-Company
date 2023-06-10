import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import { validator } from '../../../utils/validator'
import { useHistory } from 'react-router-dom'
import { validatorConfig } from '../../../utils/validatorConfig'
import { useDispatch, useSelector } from 'react-redux'
import {
    getQualities,
    getQualitiesLoadingStatus
} from '../../../store/qualities'
import {
    getProfessions,
    getProfessionsLoadingStatus
} from '../../../store/professions'
import { getCurrentUserData, updateUser } from '../../../store/users'

const EditUser = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const dispatch = useDispatch()
    const currentUser = useSelector(getCurrentUserData())
    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && !data) {
            setData({
                ...currentUser,
                qualities: transformQualitiesByIds(currentUser.qualities)
            })
        }
    }, [professionsLoading, qualitiesLoading, data])

    useEffect(() => {
        if (data && isLoading) setIsLoading(false)
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
        dispatch(
            updateUser({
                ...data,
                qualities: data.qualities.map((qual) => qual.value)
            })
        )
    }

    const transformQualitiesByIds = (ids) => {
        const qualitiesArray = []
        for (const id of ids) {
            for (const quality of qualities) {
                if (quality._id === id) {
                    qualitiesArray.push({
                        label: quality.name,
                        value: quality._id,
                        color: quality.color
                    })
                    break
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

    return (
        <div className="container mt-5">
            <button
                className="btn btn-primary mb-3"
                onClick={() => history.goBack()}
            >
                <i className="bi bi-caret-left-fill"></i> Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
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
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </div>
    )
}

EditUser.propTypes = {
    userId: PropTypes.string.isRequired
}

export default EditUser
