document.addEventListener('DOMContentLoaded', function () {
    writeLocalStorageValue();
});
function addUnit() {
    var unitComments = document.getElementById('unitComments');
    var newUnit = document.createElement('div');
    newUnit.innerHTML = "\n    <div id=\"comment\" class=\"comment\">\n        <h3>Unit 1</h3>\n        <div class=\"grade-comment\">\n            <textarea id=\"grade1Comment\" name=\"grade1Comment\" rows=\"4\" placeholder=\"Enter Grade 1 Comment\"></textarea>\n        </div>\n\n        <div class=\"grade-comment\">\n            <textarea id=\"grade2Comment\" name=\"grade2Comment\" rows=\"4\" placeholder=\"Enter Grade 2 Comment\"></textarea>\n        </div>\n\n        <div class=\"grade-comment\">\n            <textarea id=\"grade3Comment\" name=\"grade3Comment\" rows=\"4\" placeholder=\"Enter Grade 3 Comment\"></textarea>\n        </div>\n\n        <div class=\"grade-comment\">\n            <textarea id=\"grade4Comment\" name=\"grade4Comment\" rows=\"4\" placeholder=\"Enter Grade 4 Comment\"></textarea>\n        </div>\n        <select id=\"unitGrade\" name=\"unitGrade\" class=\"unitGrade\">\n            <option value=\"4\">4 - Excellent</option>\n            <option value=\"3\">3 - Good</option>\n            <option value=\"2\">2 - Average</option>\n            <option value=\"1\">1 - Poor</option>\n        </select>\n    </div>\n    ";
    if (unitComments) {
        unitComments.appendChild(newUnit);
    }
}
function getUnitComments() {
    var unitCommentsArray = [];
    var unitCommentsDiv = document.getElementById('unitComments');
    var unitSections;
    if (unitCommentsDiv != null) {
        unitSections = unitCommentsDiv.querySelectorAll('.comment');
    }
    else {
        printToCommentOutput("error");
        return;
    }
    console.log(unitSections);
    unitSections.forEach(function (unitSection, index) {
        var commentTextareas = unitSection.querySelectorAll('.grade-comment textarea');
        commentTextareas.forEach(function (textarea) {
            unitCommentsArray.push(textarea.value);
        });
    });
    return unitCommentsArray;
}
function storeUnitComments() {
    var unitCommentsStructure = getUnitComments();
    var unitCommentsJSON = JSON.stringify(unitCommentsStructure);
    localStorage.clear();
    localStorage.setItem("unitComments", unitCommentsJSON);
}
function writeLocalStorageValue() {
    var local = localStorage.getItem("unitComments");
    if (!local)
        return;
    var localStorageValue = JSON.parse(local);
    if (!localStorageValue)
        return;
    var unitLength = (localStorageValue.length / 4) - (localStorageValue.length % 4);
    for (var i = 1; i < unitLength; i++) {
        addUnit();
    }
    var unitElement = document.getElementById('unitComments');
    if (!unitElement)
        return;
    var unitSections = unitElement.querySelectorAll('.comment');
    if (!unitSections)
        return;
    var unitSectionTextAreaArray = [];
    unitSections.forEach(function (unitSection, sectionIndex) {
        var unitSections = unitSection.querySelectorAll('.grade-comment textarea');
        unitSections.forEach(function (element) {
            unitSectionTextAreaArray.push(element);
        });
    });
    for (var i = 0; i < localStorageValue.length; i++) {
        unitSectionTextAreaArray[i].value = localStorageValue[i];
    }
}
function compileComment() {
    var studentNameObject = document.getElementById("studentName");
    var pronounObject = document.getElementById("pronoun");
    var studentName;
    var pronoun;
    if (studentNameObject != null && pronounObject != null) {
        studentName = studentNameObject.value;
        pronoun = pronounObject.value;
    }
    var comments = getUnitComments();
    if (!comments)
        return;
    var gradesContainerDiv = document.getElementById('unitComments');
    var gradesCommentDivs;
    var grades = [];
    if (gradesContainerDiv != null) {
        gradesCommentDivs = gradesContainerDiv.querySelectorAll('.comment');
    }
    else {
        printToCommentOutput("gradesContainerDiv is null");
    }
    for (var i = 0; i < gradesCommentDivs.length; i++) {
        var select = gradesCommentDivs[i].querySelector('select');
        grades.push(parseInt(select.value));
    }
    var finalCommentArray = [];
    var substrings = pronoun.split("_");
    var finalCommentString = "";
    for (var i = 0; i < grades.length; i++) {
        finalCommentArray.push(comments[(i * 4) + grades[i] - 1] + ". ");
        finalCommentArray[i] = parseForNamesAndSuch(finalCommentArray[i], substrings[0], substrings[1], studentName);
        finalCommentArray[i] = capitalizeFirstLetter(finalCommentArray[i]);
        finalCommentString += finalCommentArray[i];
    }
    printToCommentOutput(finalCommentString);
}
function parseForNamesAndSuch(comment, subject, possessive, name) {
    /*
        <name>, <subject>, <possessive>
    */
    return comment
        .replace(/<name>/g, name)
        .replace(/<subject>/g, subject)
        .replace(/<possessive>/g, possessive);
}
function capitalizeFirstLetter(inString) {
    return inString.charAt(0).toUpperCase() + inString.slice(1);
}
function isLetter(str) { return str.length === 1 && str.match(/[a-z]/i); }
function printToCommentOutput(text) {
    var commentOutput = document.getElementById("commentOutput");
    if (commentOutput != null) {
        commentOutput.innerText = text;
    }
}
