import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
    async execute(userId: string) {
        const token = sign({}, "410b99d9-eec5-4552-892e-84ea446d99b4", {
            subject: userId,
            expiresIn: "30s"
        });

        return token;
    }
}

export { GenerateTokenProvider };