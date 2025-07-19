import { Request } from "express";

export interface SessionData {
    userId?: string;
    // scope: request
    formState?: any;
    message?: {
        type: 'error' | 'info' | 'success',
        content: string
    } 
}

export const setSessionData = (data: SessionData, request: Request) => {
    if(!!request.session) {
        // userId
        request.session.userId = data.userId;
        // formState
        request.session.formState = data.formState;
        // message
        request.session.message = data.message;
    }
}

export const getSessionData = (request: Request): SessionData | undefined => {
    if(!!request.session) {
        return {
            userId: request.session.userId,
            formState: request.session.formState,
            message: request.session.message
        }
    }
}