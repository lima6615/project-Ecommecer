import { requestBackend } from "../utils/request";
import * as authService from "../services/auth-service";

export function findMe(){

    const headers = {
        authorization: "Bearer " + authService.getAccessToken()
    }

    console.log(headers);
    return requestBackend({url: '/users/me', headers})
}