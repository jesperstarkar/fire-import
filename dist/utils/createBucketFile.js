import fs from "fs-extra";
import { getFirebaseBucketLocalPath } from "../Constants/index.js";
export default function createBucketFile(project_id) {
    let BucketObj = {
        buckets: [],
    };
    BucketObj.buckets.push({
        id: `${project_id}.firebasestorage.app`,
    });
    fs.ensureDirSync(getFirebaseBucketLocalPath());
    fs.writeJsonSync(getFirebaseBucketLocalPath("buckets.json"), BucketObj);
}
