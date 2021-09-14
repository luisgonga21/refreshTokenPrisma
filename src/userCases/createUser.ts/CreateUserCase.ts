import { hash } from "bcryptjs"

import { client } from "../../prisma/client";

interface IUserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserCase {
    async execute({name, password, email}: IUserRequest) {
        // Verificar se o usuário existe!
        const userAlreadyExists = await client.user.findFirst({
            where:{
                email
            }
        });

        if(userAlreadyExists) {
            throw new Error("User already exists!");
        }

        // Cadastra o usuário!

        const passwordHash = await hash(password, 8);

        const user =await client.user.create({
            data: {
                name,
                password: passwordHash,
                email,
            }
        });

        return user;
    }
};

export { CreateUserCase }