export const validatorConfig = {
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
    },
    profession: {
        isRequired: { message: 'Обязательно выберите вашу профессию' }
    },
    licence: {
        isRequired: {
            message:
                'Вы не можете использовать сервис без подтверждения лицензионного соглашения'
        }
    },
    name: {
        isRequired: {
            message: 'Имя обязательно для заполнения'
        },
        minLength: {
            message: 'Пароль должен содержать минимум 2 символов',
            value: 2
        }
    },
    content: {
        isRequired: {
            message: 'Сообщение не может быть пустым'
        }
    }
}
