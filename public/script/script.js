// -------------------------- Delete Button ------------------- 
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-button')) {
        // Handle edit button click for the corresponding row
        const row = event.target.closest('tr');
        // Implement your edit functionality here
    } else if (event.target.classList.contains('delete-button')) {
        // Handle delete button click for the corresponding row
        const row = event.target.closest('tr');
        row.remove(); // Remove the row from the table
    }
});

// ------------ nav start ---------
let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");
menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
});
document.addEventListener("DOMContentLoaded", function () {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = year + "-" + month + "-" + day;

    document.getElementById("currentDateInput").value = formattedDate;
});
let contentContainer = document.getElementById('contentContainer')

// ------------------------ loading start ------------------------
setTimeout(function () {
    document.getElementById('loadingContainer').style.display = 'none';
    contentContainer.style.display = "blocks"
    contentContainer.style.display = 'flex'
}, 2000);
// ------------------------ loading end ------------------------


// ------------------------ redirect to back page start ------------------------

function redirectToDetails(entryId) {
    window.location.href = '/edit/' + entryId;
}
// ------------------------ redirect to back page end ------------------------

// ------------------------ redirect to back page end ------------------------
// Example using fetch API
document.getElementById('AdminInputForm').addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('/admin', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const result = await response.json();
            // Display success popup
            alert(result.message);
        } else {
            const error = await response.json();
            // Display error popup
            alert(error.error);
        }
    } catch (error) {
        console.error('Error:', error);
        // Display generic error popup
        alert('An error occurred');
    }
});
