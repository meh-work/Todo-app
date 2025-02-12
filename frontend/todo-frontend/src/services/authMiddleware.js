import { adminLoginRoute, adminLogoutRoute } from "../routes/routes"

export const logoutMiddleware = async (token) => {
    await adminLogoutRoute(token)    
}

export const loginMiddleWare = async (data) => {
    const loginMidData = await adminLoginRoute(data);    
    return loginMidData;
}