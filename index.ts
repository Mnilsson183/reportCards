document.addEventListener('DOMContentLoaded', function() {
    writeLocalStorageValue();
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
    if(unitComments){
        unitComments.appendChild(newUnit);
    }
}


function getUnitComments() {
    let unitCommentsArray: string[] = [];
    const unitCommentsDiv = document.getElementById('unitComments')
    let unitSections;
    if(unitCommentsDiv){
        unitSections = unitCommentsDiv.querySelectorAll('.comment');
    } else return;
    console.log(unitSections)

    unitSections.forEach((unitSection, index) => {
        const commentTextareas = unitSection.querySelectorAll('.grade-comment textarea') as NodeListOf<HTMLTextAreaElement>;
        commentTextareas.forEach(textarea => {
            unitCommentsArray.push(textarea.value.trim());
        });
    });
    return unitCommentsArray;
}


function storeUnitComments(){
    let unitCommentsStructure = getUnitComments();
    const unitCommentsJSON = JSON.stringify(unitCommentsStructure);
    localStorage.clear();
    localStorage.setItem("unitComments", unitCommentsJSON);
}

function writeLocalStorageValue(){
    const local = localStorage.getItem("unitComments");
    if(!local) return;
    const localStorageValue = JSON.parse(local);
    if(!localStorageValue) return;
    let unitLength = (localStorageValue.length/4) - (localStorageValue.length%4); 
    for(let i = 1; i < unitLength; i++){
        addUnit();
    }
    const unitElement = document.getElementById('unitComments');
    if(!unitElement) return;
    const unitSections = unitElement.querySelectorAll('.comment');
    if(!unitSections) return;
    let unitSectionTextAreaArray: HTMLTextAreaElement[] = [];
    unitSections.forEach((unitSection, sectionIndex) => {
        const unitSections = unitSection.querySelectorAll('.grade-comment textarea') as NodeListOf<HTMLTextAreaElement>;
        unitSections.forEach(element => {
            unitSectionTextAreaArray.push(element);
        })

    });
    for(let i = 0; i < localStorageValue.length; i++){
        unitSectionTextAreaArray[i].value = localStorageValue[i];
    }
}

function compileComment(): void{
    const studentNameObject = <HTMLInputElement>document.getElementById("studentName");
    const pronounObject = <HTMLInputElement>document.getElementById("pronoun");
    let studentName;
    let pronoun;
    if(studentNameObject != null && pronounObject != null){
        studentName = studentNameObject.value;
        pronoun = pronounObject.value;
    }
    let comments = getUnitComments();
    if(!comments) return;

    const gradesContainerDiv = document.getElementById('unitComments');
    let gradesCommentDivs;
    let grades: number[] = [];
    if(gradesContainerDiv != null){
        gradesCommentDivs = gradesContainerDiv.querySelectorAll('.comment');   
    } else {
        printToCommentOutput("gradesContainerDiv is null");
    }
    for(let i : number = 0; i < gradesCommentDivs.length; i++){
        const select = gradesCommentDivs[i].querySelector('select');
        grades.push(parseInt(select.value));
    }

    let finalCommentArray:string[] = [];
    let substrings = pronoun.split("_");
    let finalCommentString = "";
    for(let i : number = 0; i < grades.length; i++){
        if(!comments[(i*4)+grades[i]-1]) break;
        finalCommentArray.push(comments[(i * 4) + grades[i] - 1] + ". ");
        finalCommentArray[i] = parseForNamesAndSuch(finalCommentArray[i], substrings[0], substrings[1], studentName);
        finalCommentArray[i] = capitalizeFirstLetter(finalCommentArray[i]);
        finalCommentString += finalCommentArray[i];
    }
    printToCommentOutput(finalCommentString);
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

function capitalizeFirstLetter(inString:string) {
    return inString.charAt(0).toUpperCase() + inString.slice(1);
}

function printToCommentOutput(text : string){
    let commentOutput = document.getElementById("commentOutput");
    if(commentOutput != null){
        commentOutput.innerText = text;
    }
}
