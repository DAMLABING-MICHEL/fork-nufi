import { NextFunction, Request, Response, Router } from "express";
import userRoute from "./user.middleware";
import { getSessionData } from "../utils/SessionHelper";

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

indexRoute.use('/user', userRoute);

export default indexRoute;