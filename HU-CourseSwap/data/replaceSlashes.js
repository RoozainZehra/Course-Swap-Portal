import fs from "fs";

// Load the JSON data
const filePath = "./courses.json";
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Replace slashes with hyphens in the "code" field
data.courses.forEach((course) => {
  if (course.code) {
    course.code = course.code.replace(/\//g, "-");
  }
});

// Save the updated JSON back to the file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

console.log("Slashes in 'code' fields have been replaced with hyphens.");