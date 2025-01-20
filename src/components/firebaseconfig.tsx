import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDg2TyBN8wmhcC_7_70HpBJG6Hth6FTRp0",
    authDomain: "nithhub-bc619.firebaseapp.com",
    projectId: "nithhub-bc619",
    storageBucket: "nithhub-bc619.firebasestorage.app",
    messagingSenderId: "488001460745",
    appId: "1:488001460745:web:eab3cbf10c57b185c1b6d8",
    measurementId: "G-TZ50RPTDMS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };
