import apiClient from './index';

export const createUser = async (userData: any) => {
    try{
        const response = await apiClient.post('/users',userData)
        return response.data
    }catch(err: any){
        throw err
    }
}

export const getUser = async (userData: any) => {
    try{
        const response = await apiClient.post('/users/login', userData)
        return response.data.user
    }catch(err: any){
        throw err
    }
}

export const authUser = async () => {
    try{
        const response = await apiClient.get('/users/auth')
        console.log(response)
        return response
    }catch(err: any){
        throw err
    }
}

export const logoutUser = async () => {
    try{
        await apiClient.get('/users/logout')
        return 
    }catch(err: any){
        throw err
    }
}