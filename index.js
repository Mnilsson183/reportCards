document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('commentForm');
    const commentOutput = document.getElementById('commentOutput');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const grade = parseFloat(document.getElementById('grade').value);
        const commentSelection = document.getElementById('commentSelection').value;

        let comment = '';

        // Switch statement to select comment based on grade level
        switch (commentSelection) {
            case 'excellent':
                comment = "Excellent performance! Keep up the great work.";
                break;
            case 'good':
                comment = "Good job overall, but there's room for improvement.";
                break;
            case 'average':
                comment = "Work on improving your performance in certain areas.";
                break;
            case 'poor':
                comment = "Significant improvement is needed to meet expectations.";
                break;
            default:
                comment = "Please select a comment.";
        }

        // Display the generated comment
        commentOutput.textContent = comment;
    });
});
