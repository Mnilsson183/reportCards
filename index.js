document.addEventListener('DOMContentLoaded', function () {
    writeCookieValue();
});
function addUnit() {
    var unitComments = document.getElementById('unitComments');
    var newUnit = document.createElement('div');
    newUnit.innerHTML = "\n    <div id=\"comment\" class=\"comment\">\n        <h3>Unit 1</h3>\n        <div class=\"grade-comment\">\n            <textarea id=\"grade1Comment\" name=\"grade1Comment\" rows=\"4\" placeholder=\"Enter Grade 1 Comment\"></textarea>\n        </div>\n\n        <div class=\"grade-comment\">\n            <textarea id=\"grade2Comment\" name=\"grade2Comment\" rows=\"4\" placeholder=\"Enter Grade 2 Comment\"></textarea>\n        </div>\n\n        <div class=\"grade-comment\">\n            <textarea id=\"grade3Comment\" name=\"grade3Comment\" rows=\"4\" placeholder=\"Enter Grade 3 Comment\"></textarea>\n        </div>\n\n        <div class=\"grade-comment\">\n            <textarea id=\"grade4Comment\" name=\"grade4Comment\" rows=\"4\" placeholder=\"Enter Grade 4 Comment\"></textarea>\n        </div>\n        <select id=\"unitGrade\" name=\"unitGrade\" class=\"unitGrade\">\n            <option value=\"4\">4 - Excellent</option>\n            <option value=\"3\">3 - Good</option>\n            <option value=\"2\">2 - Average</option>\n            <option value=\"1\">1 - Poor</option>\n        </select>\n    </div>\n    ";
    if (unitComments != null) {
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
    }
    console.log(unitSections);
    unitSections.forEach(function (unitSection, index) {
        var commentTextareas = unitSection.querySelectorAll('.grade-comment textarea');
        commentTextareas.forEach(function (textarea) {
            unitCommentsArray.push(textarea.value);
            console.log(textarea.value);
        });
    });
    return unitCommentsArray;
}
function storeUnitComments() {
    var unitCommentsStructure = getUnitComments();
    var unitCommentsJSON = JSON.stringify(unitCommentsStructure);
    document.cookie = "unitComments=".concat(unitCommentsJSON, "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/");
}
// Function to retrieve a cookie by name
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        var _a = cookie.split('='), cookieName = _a[0], cookieValue = _a[1];
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return '';
}
function writeCookieValue() {
    var cookieString = getCookie("unitComments");
    var cookie;
    if (cookieString != "") {
        cookie = JSON.parse(cookieString);
    }
    else {
        return false;
    }
    console.log(cookie);
    var unitLength = (cookie.length / 4) - (cookie.length % 4);
    for (var i = 1; i < unitLength; i++) {
        addUnit();
    }
    var unitSections = document.querySelectorAll('.unitComments.comments');
    unitSections.forEach(function (unitSection, sectionIndex) {
        var commentTextareas = unitSection.querySelectorAll('.grade-comments textarea');
        if (sectionIndex < cookie.length) {
            ;
            cookie.forEach(function (comment, index) {
                if (index < commentTextareas.length) {
                    commentTextareas[index].value = comment;
                }
            });
        }
    });
}
function compileComment() {
    var finalComment = "";
    var studentNameObject = document.getElementById("studentName");
    var pronounObject = document.getElementById("pronoun");
    var studentName;
    var pronoun;
    if (studentNameObject != null && pronounObject != null) {
        studentName = studentNameObject.value;
        pronoun = pronounObject.value;
    }
    var comments = getUnitComments();
    var gradesContainerDiv = document.getElementById('unitComments');
    var gradesCommentDivs;
    var grades = [];
    if (gradesContainerDiv != null) {
        gradesCommentDivs = gradesContainerDiv.querySelectorAll('.comment');
    }
    else {
        printToCommentOutput("gradesContainerDiv is null");
    }
    console.log(gradesCommentDivs);
    for (var i = 0; i < gradesCommentDivs.length; i++) {
        var select = gradesCommentDivs[i].querySelector('select');
        grades.push(parseInt(select.value));
    }
    console.log(studentName);
    console.log(pronoun);
    console.log(comments);
    console.log(grades);
    for (var i = 0; i < grades.length; i++) {
        finalComment += comments[(i * 4) + grades[i] - 1] + " ";
    }
    var substrings = pronoun.split("_");
    console.log(substrings);
    printToCommentOutput(parseForNamesAndSuch(finalComment, substrings[0], substrings[1], studentName));
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
function printToCommentOutput(text) {
    var commentOutput = document.getElementById("commentOutput");
    if (commentOutput != null) {
        commentOutput.innerText = text;
    }
}
