import httpService from './http.service'

const professonEndPoint = 'profession/'

const professonService = {
    get: async () => {
        const { data } = await httpService.get(professonEndPoint)
        return data
    }
}

export default professonService
