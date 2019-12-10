import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

export const onUserCreated = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async ({ uid }) => {
    try {
      return await admin
        .firestore()
        .doc(`users/${uid}`)
        .set({
          balance: 0
        });
    } catch (error) {
      throw new Error(`error while adding to firestore: ${error}`);
    }
  });
