const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, setDoc, Timestamp, GeoPoint } = require("firebase/firestore");

// Copy fields from src/firebase.js (manually or require if it was commonjs)
// Since src/firebase.js is ES module, we just copy the config here for simplicity in this node script.
const firebaseConfig = {
    apiKey: "AIzaSyCyziMmBDF3EUic692NgehZ4HQLk8NdHvo",
    authDomain: "vanfleet-platform.firebaseapp.com",
    projectId: "vanfleet-platform",
    storageBucket: "vanfleet-platform.firebasestorage.app",
    messagingSenderId: "905223748282",
    appId: "1:905223748282:web:a24e86bfbc0dec23dee083",
    measurementId: "G-10GT5MWKP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedData() {
    console.log("Starting data seed for 'vans' collection...");

    try {
        const vanId = "van-01";
        const vanData = {
            name: "Dodge ProMaster 1500",
            status: "active",
            lastLocation: new GeoPoint(37.5407, -77.4360), // Richmond, VA
            updatedAt: Timestamp.now()
        };

        await setDoc(doc(db, "vans", vanId), vanData);
        console.log(`Successfully added document with ID: ${vanId}`);

        // Optional: Add a few more for fun/testing if needed, but sticking to user request for now.

        console.log("Seeding complete.");
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

seedData();
