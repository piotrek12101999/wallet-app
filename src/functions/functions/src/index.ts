import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const onUserCreated = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async ({ uid }) => {
    admin.firestore().settings({ timestampsInSnapshots: true });

    try {
      return await admin
        .firestore()
        .collection('users')
        .add({
          uid,
          balance: 0
        });
    } catch (error) {
      throw new Error(`error while adding to firestore: ${error}`);
    }
  });
