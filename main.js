document.addEventListener("DOMContentLoaded", function() {
    var submitButton = document.getElementById("submit");

    submitButton.addEventListener("click", function() {
        event.preventDefault();
        var weights = {
            'OS': 3,
            'DAA': 4,
            'AIML': 4,
            'SN-LAB': 1,
            'SN': 2,
            'AP': 1,
            'PROJECT': 2,
            'ST': 2,
            'GP': 1
        };

        var total = 0;
        var isError = false;

        document.querySelectorAll('.inputBox input').forEach(function(input) {
            var subjectId = input.parentNode.id;
            var grade = input.value.toUpperCase();

            var gradeValues = {
                'A+': 10,
                'A': 9,
                'B+': 8,
                'B': 7,
                'C+': 6,
                'C': 5,
                'D+': 4,
                'D': 3,
                'E': 2
            };

            if (gradeValues.hasOwnProperty(grade)) {
                // Use parseFloat to convert grades to numeric values
                total += parseFloat(gradeValues[grade]) * weights[subjectId];
            } else {
                isError = true;
                alert("Error: Please enter valid grades for all subjects.");
                return;
            }
        });

        if (!isError) {
            // Perform the final calculation in floating-point arithmetic
            var finalResult = total / 20.0;

            // Display the result
            document.querySelector('.ScrollBar').scrollTop = 0;
            document.querySelectorAll('.inputBox input').forEach(function (input) {
                input.value = '';
            });
            displayResult(finalResult.toFixed(2));
        }

        function displayResult(result) {
            var resultHeading = document.getElementById('resultHeading');
            resultHeading.textContent = 'Result: ' + result;
        }
    });
});
