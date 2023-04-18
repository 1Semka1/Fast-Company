import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SelectField from '../form/selectField'
import TextAreaField from '../form/textAreaField'
import { validatorConfig } from '../../../utils/validatorConfig'
import { validator } from '../../../utils/validator'
import api from '../../../api'

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({
        userId: '',
        content: ''
    })
    const [users, setUsers] = useState({})
    const [errors, setErrors] = useState({})
    useEffect(() => {
        validate()
    }, [data])
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(
                Object.keys(data).map((user) => ({
                    label: data[user].name,
                    value: data[user]._id
                }))
            )
        })
    }, [])
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            ...target
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) {
            return
        }
        onSubmit(data)
        setData({
            userId: '',
            content: ''
        })
        setErrors({})
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    return (
        <div>
            <h1>Новый комментарии</h1>
            <form onSubmit={handleSubmit}>
                <SelectField
                    defaultOption="Выберите пользователя"
                    name="userId"
                    options={users}
                    onChange={handleChange}
                    value={data.userId}
                    error={errors.userId}
                />
                <TextAreaField
                    label="Сообщение"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" disabled={!isValid}>
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    )
}

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
}

export default AddCommentForm
