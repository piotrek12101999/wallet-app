"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.onUserCreated = functions
    .region('europe-west1')
    .auth.user()
    .onCreate(({ uid }) => __awaiter(void 0, void 0, void 0, function* () {
    admin.firestore().settings({ timestampsInSnapshots: true });
    try {
        return yield admin
            .firestore()
            .collection('users')
            .add({
            uid,
            balance: 0
        });
    }
    catch (error) {
        throw new Error(`error while adding to firestore: ${error}`);
    }
}));
//# sourceMappingURL=index.js.map