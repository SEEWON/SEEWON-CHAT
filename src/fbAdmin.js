const admin = require('firebase-admin');
const serviceAccount = require('./serviceAcountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-messenger-ccf46-default-rtdb.firebaseio.com',
});

const db = admin.database();
const ref = db.ref('restricted_access/secret_document');
ref.once('value', function (snapshot) {
  console.log(snapshot.val());
});
