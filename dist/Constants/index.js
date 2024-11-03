export const StartFirebaseEmulatorCommand = "firebase emulators:start --import=./firebaseExport --export-on-exit=./firebaseExport";
export const StartFirebaseEmulatorCommandAll = "firebase emulators:start --import=./firebaseExport --export-on-exit=./firebaseExport";
export const GCPLogin = "gcloud auth login";
export const setGCPProjectId = (projectId) => `gcloud config set project ${projectId}`;
export const ExportFirestoreToBucket = (projectId) => `gcloud firestore export gs://${projectId}.firebasestorage.app/firestore_export/`;
export const DownloadFolderFromBucket = (projectId) => `gsutil -m cp -r gs://${projectId}.firebasestorage.app/firestore_export ./firebaseExport/`;
export const getFirebaseExportPath = (path) => path ? `firebaseExport/${path}` : "firebaseExport";
export const getFirebaseBucketLocalPath = (path) => path
    ? `firebaseExport/storage_export/${path}`
    : "firebaseExport/storage_export";
export const firebaseStorageBlobsPath = "./firebaseExport/storage_export/blobs/";
export const firebaseStorageMetadataPath = "./firebaseExport/storage_export/metadata/";
export const getGoogleAuthTokenCommand = "gcloud auth print-access-token";
export const deleteFireStoreFolderBucket = (projectId) => `gsutil rm -r gs://${projectId}.firebasestorage.app/firestore_export/`;
