import { NextFunction, Request, Response, Router } from "express";
import userRoute from "./user.middleware";
import { getSessionData, setSessionData } from "../utils/SessionHelper";
import { getOneUser } from "../service/user.service";

const indexRoute = Router();

indexRoute.get('', (request: Request, response: Response, _next: NextFunction) => {
    const data = getSessionData(request);
    response.render("home", {
        message: data?.message
    });
});

indexRoute.get('/login', (request: Request, response: Response, _next: NextFunction) => {
    const data = getSessionData(request);
    response.render("login", {
        formState: data?.formState,
        message: data?.message
    });
});

indexRoute.get('/profile', async (request: Request, response: Response, _next: NextFunction) => {
    const data = getSessionData(request);
    if (!data?.userId) {
        setSessionData({
            message: {
                type: 'error',
                content: "You must be logged in to view your profile."
            }
        }, request);
        return response.redirect('/login');
    }
    const user = await getOneUser(data.userId);

    response.render('profile', {
        user,
        message: data.message,
        formState: data.formState
    });
});

indexRoute.use('/user', userRoute);

export default indexRoute;