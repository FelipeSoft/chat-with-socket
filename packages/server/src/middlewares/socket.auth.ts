import { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface SocketWithAuth extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
    decoded: JwtPayload | string;
    username?: string;
}

export const checkSocketUserAuthentication = (
    socket: SocketWithAuth,
    next: (err?: Error) => void
) => {
    const cookie = socket.handshake.headers.cookie;

    if (!cookie) {
        return next(new Error("cookie is required"));
    }

    const token = cookie.split('; ').find(c => c.startsWith('token='))?.split('=')[1];

    if (!token) {
        return next(new Error("token is required"));
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error"));
        }

        socket.decoded = decoded!;
        next();
    });
};
