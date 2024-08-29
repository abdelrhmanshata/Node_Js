const fs = require("fs");
const path = require("path");
const fsPath = require("path");
const studentPath = fsPath.join(
  path.dirname(process.mainModule.filename),
  "data",
  "Students.json"
);

function getStudents() {
  try {
    const info = fs.readFileSync(studentPath);
    const Students = JSON.parse(info.toString());
    return Students;
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

function saveStudents(Students) {
  // 3 write into file
  fs.writeFile(studentPath, JSON.stringify(Students), (err) => {
    if (!err) {
      console.log("Student saved successfully");
    } else {
      console.error("Error saving student", err);
    }
  });
}

module.exports = class Student {
  constructor({ name, age, grade, email }) {
    this.id = Date.now();
    this.name = name;
    this.age = age;
    this.grade = grade;
    this.email = email;
  }

  SaveStudent() {
    // 1 read from file
    let Students = getStudents();
    // 2 update data
    Students.push(this);
    // 3 write into file
    saveStudents(Students);
  }

  static fetchAllStudents() {
    // 1 read from file
    return getStudents();
  }

  static fetchStudentByID(id) {
    // 1 read from file
    let Students = getStudents();
    return Students.find((val, indx, arr) => {
      return val.id == id;
    });
  }

  static deleteStudentByID(id) {
    // 1 read from file
    let Students = getStudents();
    let index = Students.findIndex((val, indx, arr) => {
      return val.id == id;
    });
    if (index !== -1) {
      // 2 update data
      Students.splice(index, 1);
      // 3 write into file
      saveStudents(Students);
      return true;
    } else {
      return false;
    }
  }

  static UpdateStudent(id, data) {
    // 1 read from file
    let Students = getStudents();
    let index = Students.findIndex((val, indx, arr) => {
      return val.id == id;
    });
    if (index !== -1) {
      // 2 update data
      Object.assign(Students[index], data);
      // 3 write into file
      saveStudents(Students);
      return Students[index];
    } else {
      return "student not found";
    }
  }
};
