/*
STUDENT GRADE TRACKER
1. Add students and grades
2. Display all students dynamically
3. Calculate average grades
4. Delete students
5. Highlight students above average
6. Save data using localStorage

DATA STRUCTURE USED
ARRAY---> "students"
to store multiple student

HOW THE APPLICATION WORKS


1. User submits the form
2. Form validation checks:
   - name is not empty
   - grade is between 0 and 100
3. A student object is created
4. Student is pushed into the array
5. Data is saved into localStorage
6. displayStudents() updates the DOM
7. Average grade is recalculated
8. Students above average are highlighted

MAIN FUNCTIONS

1. displayStudents()
   - Displays all students in the table
   - Calculates average grade
   - Highlights students above average

2. deleteStudent(id)
   - Removes a student using filter()
   - Updates localStorage
   - Re-renders the table

3. saveToLocalStorage()
   - Converts array to JSON string
   - Saves data in browser storage

DOM METHODS

getElementById()
createElement()
appendChild()
innerHTML
textContent

ARRAY METHODS

push()
forEach()
filter()

LOCAL STORAGE


localStorage stores data in the browser
so students remain after page reload.

JSON.stringify()
- Converts JS array to string

JSON.parse()
- Converts string back to JS array

*/

const form = document.getElementById("form");
const studentName = document.getElementById("name");
const grade = document.getElementById("grade");
const studentList = document.getElementById("studentList");
const average = document.getElementById("average");
const error = document.getElementById("error");

// Data from LocalStorage using get
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display the saved students on load
displayStudents();

// Add Student
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameValue = studentName.value.trim();
  const gradeValue = Number(grade.value);

  // Validate
  if (nameValue === "") {
    error.textContent = "Student name cannot be empty";
    return;
  }

  if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
    error.textContent = "Grade must be between 0 and 100";
    return;
  }

  // Clear Error
  error.textContent = "";

  // Create Student details(Object)
  const student = {
    id: Date.now(),
    name: nameValue,
    grade: gradeValue,
  };

  // Add to Array
  students.push(student);

  // SAVE TO LOCAL STORAGE
  saveToLocalStorage();

  // Display Students
  displayStudents();

  // Clear Inputs
  studentName.value = "";
  grade.value = "";
});

// Display Students
function displayStudents() {
  // CLEAR TABLE
  studentList.innerHTML = "";

  // Calculate Total
  let total = 0;

  students.forEach(function (student) {
    total += student.grade;
  });

  // CALCULATE AVERAGE
  const avg = students.length > 0 ? total / students.length : 0;

  // show Average
  average.textContent = `Average Grade: ${avg.toFixed(2)}`;

  // Display Students
  students.forEach(function (student) {
    const tr = document.createElement("tr");

    let remark = "Below average";

    // HIGHLIGHT + REMARK LOGIC
    if (student.grade > avg) {
      tr.style.backgroundColor = "lightgreen";
      tr.style.fontWeight = "bold";
      remark = "Above average";
    }

    tr.innerHTML = `
    <td>${student.name}</td>
    <td>${student.grade}</td>
    <td>${remark}</td>
    <td>
      <button onclick="deleteStudent(${student.id})">
        Delete
      </button>
    </td>
  `;

    studentList.appendChild(tr);
  });
}

// DELETE STUDENT
function deleteStudent(id) {
  students = students.filter(function (student) {
    return student.id !== id;
  });

  // SAVE UPDATED ARRAY
  saveToLocalStorage();

  displayStudents();
}

// SAVE TO LOCAL STORAGE
function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}
