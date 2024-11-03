var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
export default function getFiles(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const subdirs = yield readdir(dir);
        const files = yield Promise.all(subdirs.map((subdir) => __awaiter(this, void 0, void 0, function* () {
            const res = resolve(dir, subdir);
            return (yield stat(res)).isDirectory() ? getFiles(res) : res;
        })));
        return files.reduce((a, f) => a.concat(f), []);
    });
}
