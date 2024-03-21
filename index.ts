document.addEventListener('DOMContentLoaded', function() {
    writeCookieValue();
});

function addUnit() {
    const unitComments = document.getElementById('unitComments');

    const newUnit = document.createElement('div');
    newUnit.innerHTML = `
    <div id="comment" class="comment">
        <h3>Unit 1</h3>
        <div class="grade-comment">
            <textarea id="grade1Comment" name="grade1Comment" rows="4" placeholder="Enter Grade 1 Comment"></textarea>
        </div>

        <div class="grade-comment">
            <textarea id="grade2Comment" name="grade2Comment" rows="4" placeholder="Enter Grade 2 Comment"></textarea>
        </div>

        <div class="grade-comment">
            <textarea id="grade3Comment" name="grade3Comment" rows="4" placeholder="Enter Grade 3 Comment"></textarea>
        </div>

        <div class="grade-comment">
            <textarea id="grade4Comment" name="grade4Comment" rows="4" placeholder="Enter Grade 4 Comment"></textarea>
        </div>
        <select id="unitGrade" name="unitGrade" class="unitGrade">
            <option value="4">4 - Excellent</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Average</option>
            <option value="1">1 - Poor</option>
        </select>
    </div>
    `;

    if(unitComments != null){
        unitComments.appendChild(newUnit);
    }
}


function getUnitComments() {
    let unitCommentsArray: string[] = [];
    const unitCommentsDiv = document.getElementById('unitComments')
    let unitSections;
    if(unitCommentsDiv != null){
        unitSections = unitCommentsDiv.querySelectorAll('.comment');
    } else {
        printToCommentOutput("error")
    }
    console.log(unitSections)

    unitSections.forEach((unitSection, index) => {
        const commentTextareas = unitSection.querySelectorAll('.grade-comment textarea') as NodeListOf<HTMLTextAreaElement>;
        commentTextareas.forEach(textarea => {
            unitCommentsArray.push(textarea.value);
            console.log(textarea.value);
        });

    });
    return unitCommentsArray;
}


function storeUnitComments(){
    let unitCommentsStructure = getUnitComments();
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
    let cookieString = getCookie("unitComments");
    let cookie;
    if (cookieString != ""){
        cookie = JSON.parse(cookieString);
    } else {
        return false;
    }
    console.log(cookie)
    let unitLength = (cookie.length/4) - (cookie.length%4); 
    for(let i = 1; i < unitLength; i++){
        addUnit();
    }

    const unitSections = document.querySelectorAll('.unitComments.comment');
    unitSections.forEach((unitSection, sectionIndex) => {
    const commentTextareas = unitSection.querySelectorAll('.grade-comments textarea') as NodeListOf<HTMLTextAreaElement>;
    console.log(cookie);
    if (sectionIndex < cookie.length) {;
        cookie.forEach((comment, index) => {
            if (index < commentTextareas.length) {
                commentTextareas[index].value = comment;
            }
        });
    }
});}

function compileComment(): void{
    let finalComment = "";
    const studentNameObject = <HTMLInputElement>document.getElementById("studentName");
    const pronounObject = <HTMLInputElement>document.getElementById("pronoun");
    let studentName;
    let pronoun;
    if(studentNameObject != null && pronounObject != null){
        studentName = studentNameObject.value;
        pronoun = pronounObject.value;
    }
    let comments = getUnitComments();

    const gradesContainerDiv = document.getElementById('unitComments');
    let gradesCommentDivs;
    let grades: number[] = [];
    if(gradesContainerDiv != null){
        gradesCommentDivs = gradesContainerDiv.querySelectorAll('.comment');   
    } else {
        printToCommentOutput("gradesContainerDiv is null");
    }
    console.log(gradesCommentDivs);
    for(let i : number = 0; i < gradesCommentDivs.length; i++){
        const select = gradesCommentDivs[i].querySelector('select');
        grades.push(parseInt(select.value));
    }
    console.log(studentName);
    console.log(pronoun);
    console.log(comments);
    console.log(grades);

    for(let i : number = 0; i < grades.length; i++){
        finalComment += comments[(i * 4) + grades[i] - 1] + " ";
    }
    let substrings = pronoun.split("_");
    console.log(substrings);
    printToCommentOutput(parseForNamesAndSuch(finalComment, substrings[0], substrings[1], studentName));
}

function parseForNamesAndSuch(comment:string, subject:string, possessive:string, name:string) : string{
    /*
        <name>, <subject>, <possessive>
    */
        return comment
            .replace(/<name>/g, name)
            .replace(/<subject>/g, subject)
            .replace(/<possessive>/g, possessive);   
}

function printToCommentOutput(text : string){
    let commentOutput = document.getElementById("commentOutput");
    if(commentOutput != null){
        commentOutput.innerText = text;
    }
}
