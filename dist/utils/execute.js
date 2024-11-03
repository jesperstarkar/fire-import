var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { exec } from 'child_process';
export default function execute(command, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    // console.error(`exec error: ${error}`)
                    reject(error);
                }
                stdout = stdout.substring(0, stdout.length - 1);
                yield callback(stdout, stderr);
                resolve();
            }));
        });
    });
}
