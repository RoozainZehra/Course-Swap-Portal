// ES module version
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Load your JSON data
const data = JSON.parse(fs.readFileSync("./courses.json", "utf8")); // Ensure the file path is correct
const collectionName = "courses"; // Firestore collection name

async function uploadData() {
  const batch = db.batch();

  // Iterate over the courses array
  data.courses.forEach((course) => {
    if (!course.code) {
      console.error("Course is missing a 'code' field:", course);
      return;
    }

    const docRef = db.collection(collectionName).doc(course.code); // Use the course code as the document ID
    batch.set(docRef, course); // Set the course object as the document data
  });

  await batch.commit();
  console.log("Data uploaded successfully!");
}

uploadData().catch(console.error);