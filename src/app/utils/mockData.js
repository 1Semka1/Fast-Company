import { useEffect, useState } from 'react'
import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'
import httpService from '../services/http.service'

const useMockData = () => {
    const statusConsts = {
        idle: 'Not Stardet',
        pending: 'In Process',
        successed: 'Ready',
        error: 'Error occurred'
    }
    const [error, setError] = useState(null)
    const [status, setStatus] = useState(statusConsts.idle)
    const [progress, setProgress] = useState(0)
    const [count, setCount] = useState(0)
    const summaryCount = professions.length + qualities.length + users.length

    const incremetCount = () => {
        setCount((prevState) => prevState + 1)
    }

    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending)
        }
        const newProgress = Math.floor((count / summaryCount) * 100)
        if (progress < newProgress) {
            setProgress(() => newProgress)
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed)
        }
    }

    useEffect(() => {
        updateProgress()
    }, [count])

    async function initialize() {
        try {
            for (const prof of professions) {
                await httpService.put('profession/' + prof._id, prof)
                incremetCount()
            }
            for (const user of users) {
                await httpService.put('user/' + user._id, user)
                incremetCount()
            }
            for (const qual of qualities) {
                await httpService.put('quality/' + qual._id, qual)
                incremetCount()
            }
        } catch (error) {
            setError(error)
            setStatus(statusConsts.error)
        }
    }

    return { error, progress, status, initialize }
}

export default useMockData
