import { Response, Request } from "express-serve-static-core";
import { CreateUserCase } from "./CreateUserCase";

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { email, name, password } = request.body;
    
        const createUserCase = new CreateUserCase();

        const user = await createUserCase.execute({
            email,
            name,
            password,
        });

        return response.status(200).json(user);
    }
}

export { CreateUserController };







