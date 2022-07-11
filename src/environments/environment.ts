// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/users',
  firebaseConfig: {
    apiKey: "AIzaSyDkaNW5yM-OkMSKCjmNPbB_1lUV1-SQE_s",
    authDomain: "huong-9c57f.firebaseapp.com",
    databaseURL: "https://huong-9c57f-default-rtdb.firebaseio.com",
    projectId: "huong-9c57f",
    storageBucket: "huong-9c57f.appspot.com",
    messagingSenderId: "417243063105",
    appId: "1:417243063105:web:06c355fae8a63d179bb7c0",
    measurementId: "G-LJ8M2M5YJ9"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
