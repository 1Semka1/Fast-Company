import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextAreaField from '../form/textAreaField'
import { validatorConfig } from '../../../utils/validatorConfig'
import { validator } from '../../../utils/validator'

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({
        content: ''
    })
    const [errors, setErrors] = useState({})

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
        if (!isValid) {
            return
        }
        onSubmit(data)
        setData({})
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
                <TextAreaField
                    label="Сообщение"
                    name="content"
                    value={data.content || ''}
                    onChange={handleChange}
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
