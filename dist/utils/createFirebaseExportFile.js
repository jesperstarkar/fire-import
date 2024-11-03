var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs-extra';
import { getFirebaseExportPath } from '../Constants/index.js';
import execute from './execute.js';
export default function createFirebaseExportFile() {
    return __awaiter(this, void 0, void 0, function* () {
        // ! remove firebase storage and use this function only for creating file
        let firebaseObj = {
            version: null,
        };
        yield execute('firebase --version', function (output) {
            firebaseObj.version = output;
        });
        if (!firebaseObj.version) {
            return console.error('❌ Unable to find firebase cli version, please install firebase cli with "npm install -g firebase-tools"');
        }
        fs.ensureDirSync(getFirebaseExportPath());
        fs.writeJsonSync(getFirebaseExportPath('firebase-export-metadata.json'), firebaseObj);
    });
}
