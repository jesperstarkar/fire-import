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
import chalk from 'chalk';
import ora from 'ora';
import { deleteFireStoreFolderBucket, DownloadFolderFromBucket, ExportFirestoreToBucket, setGCPProjectId, StartFirebaseEmulatorCommand, } from '../Constants/index.js';
import execute from '../utils/execute.js';
import getProjectId from '../utils/getProjectId.js';
import handleGCPLogin from '../utils/handleGCPLogin.js';
import updateExportMetadata from '../utils/updateExportMetadata.js';
function firestore() {
    return __awaiter(this, void 0, void 0, function* () {
        // * Getting firebase project id
        const projectId = yield getProjectId();
        const spinner = ora('Importing data').start();
        // * Manage login with GCloud
        yield handleGCPLogin();
        // * Set project id google cloud
        yield execute(setGCPProjectId(projectId), () => { });
        // * Export firestore data to google cloud bucket (firebase storage)
        yield execute(ExportFirestoreToBucket(projectId), () => { });
        yield updateExportMetadata('firestore', {
            path: 'firestore_export',
            metadata_file: 'firestore_export/firestore_export.overall_export_metadata',
        });
        // * Get folder from google cloud bucket to local storage
        const exitCodeImport = yield executey(DownloadFolderFromBucket(projectId));
        // ? only run if the data is imported successfully
        if (exitCodeImport === 0) {
            yield execute(deleteFireStoreFolderBucket(projectId), () => { });
            spinner.succeed('Import successful');
            console.log(chalk.yellowBright('FireStore data imported 🔥🔥🔥🎉🎉🎉'));
            console.log(chalk.green('Run following command to import data to firebase emulator'));
            console.log(chalk.black.bgYellow(StartFirebaseEmulatorCommand));
            spinner.stop();
            // ! Remove firestore folder from the storage server
        }
        else {
            spinner.fail('Import failed');
        }
    });
}
export default firestore;
