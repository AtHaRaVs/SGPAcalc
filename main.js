document.addEventListener("DOMContentLoaded", function () {
  var submitButton = document.getElementById("submit");

  var scrollForm = document.querySelector(".ScrollBar");
  var arrow = document.querySelector(".arrow");
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Toast
  // Check if the user is on a mobile device based on viewport width
  if (window.innerWidth <= 800 && isMobile) {
    var fullscreenToast = document.getElementById("fullscreenToast");
  } else {
    // If not on a mobile-sized viewport, hide the fullscreen toast
    hideFullscreenToast();
  }

  function hideFullscreenToast() {
    var toast = document.getElementById("fullscreenToast");
    toast.style.display = "none";
  }

  // Function to handle scroll event
  function handleScroll() {
    if (scrollForm.scrollTop > 0) {
      // If scrolled down, hide the arrow
      arrow.style.opacity = "0";
    } else {
      // If at the top, show the arrow
      arrow.style.opacity = "1";
    }
  }

  // Add scroll event listener to the scrollForm
  scrollForm.addEventListener("scroll", handleScroll);

  // Initial check to hide/show arrow based on initial scroll position
  handleScroll();

  submitButton.addEventListener("click", function () {
    event.preventDefault();
    var weights = {
      OS: 3,
      DAA: 4,
      AIML: 4,
      "SN-LAB": 1,
      SN: 2,
      AP: 1,
      PROJECT: 2,
      GP: 1,
    };

    var total = 0;
    var isError = false;

    document.querySelectorAll(".inputBox input").forEach(function (input) {
      var subjectId = input.parentNode.id;
      var grade = input.value.toUpperCase();

      var gradeValues = {
        "A+": 10,
        A: 9,
        "B+": 8,
        B: 7,
        "C+": 6,
        C: 5,
        "D+": 4,
        D: 3,
        E: 2,
      };

      if (gradeValues.hasOwnProperty(grade)) {
        // Use parseFloat to convert grades to numeric values
        total += parseFloat(gradeValues[grade]) * weights[subjectId];
      } else {
        isError = true;
        alert(
          "Error: Please enter valid grades for all subjects. Reload the page to continue"
        );
        return;
      }
    });

    if (!isError) {
      // Perform the final calculation in floating-point arithmetic
      var finalResult = total / 18.0;

      // Display the result
      document.querySelector(".ScrollBar").scrollTop = 0;
      document.querySelectorAll(".inputBox input").forEach(function (input) {
        input.value = "";
      });
      displayResult(finalResult.toFixed(2));
    }

    function displayResult(result) {
      var resultHeading = document.getElementById("resultHeading");
      resultHeading.textContent = "Result: " + result;
    }
  });
});
