document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');

    // The new URL points to our serverless function proxy
    const API_URL = '/.netlify/functions/search';

    const fetchStudents = async () => {
        const nameQuery = nameInput.value.trim();
        if(nameQuery==""){
            alert("Please Enter Valid Name");
            return;
        }
        resultsContainer.innerHTML = '<p>Loading...</p>'; // Provide feedback to the user

        try {
            // Construct the URL with the query parameter
            const response = await fetch(`${API_URL}?name=${encodeURIComponent(nameQuery)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const students = await response.json();
            displayResults(students);
        } catch (error) {
            console.error("Failed to fetch students:", error);
            resultsContainer.innerHTML = '<p class="error">Could not fetch data. Is the backend server running?</p>';
        }
    };

    const displayResults = (students) => {
        resultsContainer.innerHTML = ''; // Clear previous results

        if (students.length === 0) {
            resultsContainer.innerHTML = '<p>No students found.</p>';
            return;
        }

        students.forEach(student => {
            const studentCard = document.createElement('div');
            studentCard.className = 'student-card';
            studentCard.innerHTML = `
                <h3>${student.name}</h3>
                <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
                <p><strong>Room:</strong> ${student.roomNumber}</p>
                <p><strong>Mobile Number: </strong>${student.phoneNumber}</p>
                <p><strong>Email: </strong>${student.email}</p>
            `;
            resultsContainer.appendChild(studentCard);
        });
    };

    searchButton.addEventListener('click', fetchStudents);
    nameInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            fetchStudents();
        }
    });
});
