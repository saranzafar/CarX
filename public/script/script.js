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

// ------------------------ Start pop-up for saving data nito mongodb ------------------------
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
// ------------------------ End pop-up for saving data nito mongodb ------------------------

// ------------------------ start Delete record from DB ------------------------
function deleteItem(id) {
    console.log("id = ",id);
    // Assuming you're using jQuery for AJAX
    $.ajax({
        url: '/delete/' + id,
        type: 'DELETE',
        success: function (response) {
            console.log(response);
            alert(response)
            location.reload()
            // You can handle the success response as needed, like updating the UI
        },
        error: function (error) {
            console.error(error);
            // Handle the error, show a message, etc.
        }
    });
}
// ------------------------ End  Delete record from DB ------------------------
