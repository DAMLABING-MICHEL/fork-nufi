import { NextFunction, Request, Response, Router } from 'express';
import { CreateUserSchema, LoginUserSchema, UpdateUserSchema } from '../dto/user-dto';
import { loginUser, registerUser, updateUser } from '../service/user.service';
import { getSessionData, setSessionData } from '../utils/SessionHelper';
const userRoute = Router();

userRoute.post('/login', (request: Request, response: Response, _next: NextFunction) => {
    const { success, error } = LoginUserSchema.safeParse(request.body);
    if(success) {
        loginUser(request.body.login, request.body.password)
            .then(user => {
                setSessionData({ 
                    userId: user.id
                }, request);
                response.redirect("/profile");
            })
            .catch((err: any) => {
                setSessionData({ 
                    formState:  {
                        errors: {},
                        data: request.body
                    },
                    message: {
                        type: 'error',
                        content: err.message
                    }
                }, request);
                response.redirect("/login");
            })
    }
    else {
        let errors: string[] = [];
        error?.errors.forEach((err) => {
            errors.push(err.message);
        });
        setSessionData({ 
            formState:  {
                errors: {},
                data: request.body
            },
            message: {
                type: 'error',
                content: errors.join(", ")
            }
        }, request);
        response.redirect("/login");
    }
})

userRoute.post('/register', (request: Request, response: Response, _next: NextFunction) => {
    const { success, error } = CreateUserSchema.safeParse(request.body);
    if(success) {
        registerUser(request.body)
        .then(user => {
            setSessionData({ 
                userId: user.id, 
                message: {
                    type: 'success', 
                    content: "Your account has been successfully created"
                } 
            }, request);
            response.redirect("/");
        })
        .catch((err: any) => {
            console.log(err);
            const errors = {"0": "An error occured, the user is not saved"};
            setSessionData({ 
                formState:  {
                    errors: errors,
                    data: request.body
                }
            }, request);
            response.redirect("/login");
        });
    }
    else {
        let errors: any = {};
        error?.errors.forEach((err) => {
            errors[err.path[0]] = err.message;
        });
        setSessionData({ 
            formState:  {
                errors: errors,
                data: request.body
            }
        }, request);
        response.redirect("/login");
    }
});

userRoute.post('/update', async (request: Request, response: Response, _next: NextFunction) => {
    const session = getSessionData(request);
    
    if(!session?.userId) {
        setSessionData({ 
            message: {
                type: 'error',
                content: "Vous devez être connecté pour mettre à jour votre profil."
            }
        }, request);
        return response.redirect('/login');
    }

    const { success, error } = UpdateUserSchema.safeParse(request.body);
    
    if(success) {
        try {
            await updateUser(session.userId, request.body);
            setSessionData({ 
                message: {
                    type: 'success',
                    content: "Votre profil a été mis à jour avec succès."
                }
            }, request);

            request.session!.save(() => {
                response.redirect("/profile");
            });

        } catch (err: any) {
            setSessionData({ 
                formState:  {
                    errors: {},
                    data: request.body
                },
                message: {
                    type: 'error',
                    content: err.message
                }
            }, request);
            response.redirect("/profile");
        }
    }
    else {
        let errors: any = {};
        error?.errors.forEach((err) => {
            errors[err.path[0]] = err.message;
        });
        setSessionData({ 
            formState:  {
                errors: errors,
                data: request.body
            }
        }, request);
        response.redirect("/profile");
    }
});
export default userRoute;