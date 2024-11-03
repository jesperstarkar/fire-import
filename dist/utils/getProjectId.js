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
import prompt from 'prompt';
export default function getProjectId() {
    return __awaiter(this, void 0, void 0, function* () {
        // check the file exists
        let isFileExists = yield fs.pathExists('./.firebaserc');
        if (isFileExists) {
            let firebaserc = yield fs.readJson('./.firebaserc');
            return firebaserc.projects.default;
        }
        isFileExists = yield fs.pathExists('./../.firebaserc');
        if (isFileExists) {
            let firebaserc = yield fs.readJson('./../.firebaserc');
            return firebaserc.projects.default;
        }
        else {
            // * Getting firebase project id
            const { projectId } = yield prompt.get(['projectId']);
            return projectId;
        }
    });
}
