var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { firebaseStorageBlobsPath, firebaseStorageMetadataPath, StartFirebaseEmulatorCommandAll, } from "../Constants/index.js";
import createBucketFile from "../utils/createBucketFile.js";
import execute from "../utils/execute.js";
import getProjectId from "../utils/getProjectId.js";
import handleGCPLogin from "../utils/handleGCPLogin.js";
import modifyMetadata from "../utils/modifyMetadata.js";
import getFiles from "../utils/readFiles.js";
import updateExportMetadata from "../utils/updateExportMetadata.js";
export default function storage() {
    return __awaiter(this, void 0, void 0, function* () {
        // * Getting firebase project id
        const projectId = yield getProjectId();
        const spinner = ora("Importing data").start();
        // ? Updating "firebase-export-metadata.json"
        yield updateExportMetadata("storage", {
            path: "storage_export",
        });
        // ? Creating "dir/buckets.json"
        createBucketFile(projectId);
        // ? Copying the data from google bucket to local storage
        fs.ensureDirSync(firebaseStorageBlobsPath);
        yield execute(`gsutil -m cp -r gs://${projectId}.firebasestorage.app ${firebaseStorageBlobsPath}`, function (output) {
            return;
        });
        // ? Reading all the files in blobs folder
        let files = yield getFiles(firebaseStorageBlobsPath);
        // * Google auth token
        // * Manage login with GCloud
        let access_token = yield handleGCPLogin();
        if (!access_token) {
            return console.error('❌ Unable to find gcloud access token. please login to gcloud with "gcloud auth login"');
        }
        // ? Getting metadata of files from the server
        let Bucket_folder = path.resolve(`${firebaseStorageBlobsPath}${projectId}.firebasestorage.app`);
        let url = `https://www.googleapis.com/storage/v1/b/${projectId}.firebasestorage.app/o/`;
        const instance = axios.create({
            baseURL: url,
            timeout: 1000,
            headers: {
                host: "www.googleapis.com",
                authorization: `Bearer ${access_token.replace(/\r?\n|\r/g, "")}`,
                "content-type": "application/json",
            },
        });
        // ? Creating metadata json files forEach file in blob folder
        for (let filepath of files) {
            let file_name = filepath.replace(Bucket_folder + path.sep, "");
            let file_name_uri = file_name.replaceAll(path.sep, "%2F");
            // * Axios GET request
            const result = yield instance.get(file_name_uri, {
                timeout: 5000,
            });
            // location is like =>
            // `./firebaseExport/storage_export/metadata/mydemop-450.firebasestorage.app/`
            fs.ensureDirSync(`${firebaseStorageMetadataPath}${projectId}.firebasestorage.app/` +
                file_name.substring(0, file_name.lastIndexOf(path.sep) + 1));
            // ? Modifying google cloud metadata to firebase metadata
            let modified_metadata = modifyMetadata(result.data);
            fs.writeJsonSync(`${firebaseStorageMetadataPath}${projectId}.firebasestorage.app/` +
                file_name +
                ".json", modified_metadata);
        }
        spinner.stop();
        // ? Command to start firebase emulator
        console.log(chalk.black.bgYellow(StartFirebaseEmulatorCommandAll));
    });
}
