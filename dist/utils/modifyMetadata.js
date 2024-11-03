export default function modifyMetadata(obj) {
    var _a, _b;
    let new_metadata = obj;
    new_metadata.contentEncoding = 'identity';
    new_metadata.downloadTokens = [];
    new_metadata.downloadTokens.push((_a = obj.metadata) === null || _a === void 0 ? void 0 : _a.firebaseStorageDownloadTokens);
    delete new_metadata.kind;
    (_b = new_metadata.metadata) === null || _b === void 0 ? true : delete _b.firebaseStorageDownloadTokens;
    delete new_metadata.id;
    delete new_metadata.selfLink;
    delete new_metadata.mediaLink;
    delete new_metadata.timeStorageClassUpdated;
    return new_metadata;
}
