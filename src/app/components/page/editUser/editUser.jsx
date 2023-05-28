import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import { validator } from '../../../utils/validator'
import { useHistory } from 'react-router-dom'
import { validatorConfig } from '../../../utils/validatorConfig'
import { useProfessions } from '../../../hooks/useProfession'
import { useQualities } from '../../../hooks/useQualities'
import { useAuth } from '../../../hooks/useAuth'

const EditUser = ({ userId }) => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    })
    const { currentUser, updateUser } = useAuth()
    const { professions, isLoading: professionsLoading } = useProfessions()
    const {
        qualities,
        getQuality,
        isLoading: qualitiesLoading
    } = useQualities()
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading) {
            setData({
                ...currentUser,
                qualities: transformQualitiesByIds(currentUser.qualities)
            })
        }
    }, [professionsLoading, qualitiesLoading])

    useEffect(() => {
        if (data._id) setIsLoading(false)
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
        await updateUser({
            ...data,
            qualities: data.qualities.map((qual) => qual.value)
        })
        history.push(`/users/${userId}`)
    }

    const transformQualitiesByIds = (ids) => {
        const qualitiesArray = []
        for (const id of ids) {
            const quality = getQuality(id)
            qualitiesArray.push({
                label: quality.name,
                value: quality._id,
                color: quality.color
            })
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
                className="btn btn-primary"
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
