var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs-extra";
import path from "path";
import getFiles from "../utils/readFiles.js";
export default function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let files = yield getFiles("./firebaseExport/storage_export/blobs");
        let __dirname = path.resolve(`./firebaseExport/storage_export/blobs/${"de-sd2291d0"}.firebasestorage.app`);
        for (let filepath of files) {
            let file_name = filepath.replace(__dirname + path.sep, "");
            fs.ensureDirSync("./firebaseExport/storage_export/metadata/" +
                file_name.substring(0, file_name.lastIndexOf(path.sep) + 1));
            fs.writeJsonSync("./firebaseExport/storage_export/metadata/" + file_name + ".json", { demp: "hello" });
        }
    });
}
