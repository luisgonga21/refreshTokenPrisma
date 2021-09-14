import "express-async-errors";
import express, { NextFunction, Response, Request } from "express";
import { router } from "./userCases/routes";

const app = express();

app.use(express.json());

app.use(router);


app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
    return  response.json({
            status: "Error",
            message: error.message,
        });
    }
);


app.listen(6000, () => console.log("Server is running on port 6000!"))

