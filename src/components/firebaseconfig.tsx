import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8cP6elbvnfVkak6Gau8sh9Fqmy0ttOFc",
    authDomain: "tabacco-fda3c.firebaseapp.com",
    projectId: "tabacco-fda3c",
    storageBucket: "tabacco-fda3c.firebasestorage.app",
    messagingSenderId: "261142238885",
    appId: "1:261142238885:web:19cf1852469481344c1f4c",
    measurementId: "G-15K69HTYZR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };
