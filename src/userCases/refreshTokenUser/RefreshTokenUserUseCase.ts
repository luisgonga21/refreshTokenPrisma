import { dayjs } from "dayjs";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";


class RefreshTokenUserUseCase {

    async execute(refresh_token: string) {
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token,
            },
        });

        if(!refreshToken) {
            throw new Error("Refresh Token invalid!!");
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

        if(refreshTokenExpired) {
            const generateRefreshTokenProvider = new GenerateRefreshToken();
            const refreshToken = await generateRefreshTokenProvider.execute(refresh_token)
        }

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.userId);

        return { token };
    }
}


export { RefreshTokenUserUseCase };