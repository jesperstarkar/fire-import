var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { execute as executey } from '@yarnpkg/shell';
import { GCPLogin, getGoogleAuthTokenCommand } from '../Constants/index.js';
import execute from './execute.js';
export default function handleGCPLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        let auth_token = '';
        let exit_code = yield executey(getGoogleAuthTokenCommand);
        if (exit_code == 0) {
            yield execute(getGoogleAuthTokenCommand, function (output) {
                auth_token = output;
            });
        }
        if (!auth_token) {
            yield execute(GCPLogin, function (output) { });
            yield execute(getGoogleAuthTokenCommand, function (output) {
                auth_token = output;
            });
        }
        return auth_token;
    });
}
