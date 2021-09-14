import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./createUser.ts/CreateUserController";
import { RefreshTokenUserController } from "./refreshTokenUser/RefreshTokenUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController


router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/refreshToken", refreshTokenUserController.handle);



router.get("/cursos", ensureAuthenticated, (request, response) => {
    return response.json([
        {id:1, name: "Nodejs"},
        {id:2, name: "Reactjs"},
        {id:3, name: "MongoDB"},
        {id:4, name: "Angularjs"},
        {id:5, name: "Nextjs"},
    ])
})

export { router };