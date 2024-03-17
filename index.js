document.addEventListener('DOMContentLoaded', function() {
    // Call the get method on startup
    writeCookieValue();
});

function addUnit() {
    const unitComments = document.getElementById('units');

    // Create a new section of unit comments
    const newUnit = document.createElement('div');
    newUnit.innerHTML = `
        <div>
            <h3>Unit</h3>
            <div class="grade-comments">
                <textarea id="grade1Comment" name="grade1Comment" rows="4" placeholder="Enter Grade 1 Comment"></textarea>
            </div>

            <div class="grade-comments">
                <textarea id="grade2Comment" name="grade2Comment" rows="4" placeholder="Enter Grade 2 Comment"></textarea>
            </div>

            <div class="grade-comments">
                <textarea id="grade3Comment" name="grade3Comment" rows="4" placeholder="Enter Grade 3 Comment"></textarea>
            </div>

            <div class="grade-comments">
                <textarea id="grade4Comment" name="grade4Comment" rows="4" placeholder="Enter Grade 4 Comment"></textarea>
            </div>
        </div>
    `;

    // Append the new unit comments section to the container
    unitComments.appendChild(newUnit);
}

function getUnitComments() {
    const unitCommentsArray = [];

    // Retrieve all unit comments sections
    const unitSections = document.querySelectorAll('.unit.comments');

    // Loop through each unit section
    unitSections.forEach((unitSection, index) => {
        // Retrieve comments from textareas within the unit section
        const commentTextareas = unitSection.querySelectorAll('.grade-comments textarea');
        commentTextareas.forEach(textarea => {
            unitCommentsArray.push(textarea.value);
        });

    });
    // console.log(unitCommentsArray[0].comments.length);
    console.log(unitCommentsArray);
    return unitCommentsArray;
}


function storeUnitComments(){
    unitCommentsStructure = getUnitComments();
    const unitCommentsJSON = JSON.stringify(unitCommentsStructure);
    document.cookie = `unitComments=${unitCommentsJSON}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
}

// Function to retrieve a cookie by name
function getCookie(name){
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return '';
}

function writeCookieValue(){
    cookie = getCookie("unitComments");
    // if (cookie = "") return;
    cookie = JSON.parse(cookie)
    console.log(cookie.length);
    unitLength = parseInt(cookie.length/4)
    for(let i = 1; i < unitLength; i++){
        addUnit();
    }

    const unitSections = document.querySelectorAll('.unit.comments');
    unitSections.forEach((unitSection, sectionIndex) => {
    const commentTextareas = unitSection.querySelectorAll('.grade-comments textarea');
    // Ensure the comment exists in the cookie array
    if (sectionIndex < cookie.length) {;
        cookie.forEach((comment, index) => {
            // Ensure the textarea exists in the current unit section
            if (index < commentTextareas.length) {
                commentTextareas[index].value = comment;
            }
        });
    }
});

}