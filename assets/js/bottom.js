// function rotateSVGSmoothly(element,element2) {
//     var svgElement = document.getElementById(element);
//     var Element2 = document.getElementById(element2);

//     // Apply transition property
//     svgElement.style.transition = "transform 0.5s ease";
//     Element2.style.display = "none";

//     // Check current rotation and rotate accordingly
//     if (svgElement.style.transform === "rotate(0deg)") {
//         // Rotate the SVG by 180 degrees
//         svgElement.style.transform = "rotate(180deg)";
//         Element2.style.display = "block";

//     } else {
//         // Reset rotation to default (0 degrees)
//         svgElement.style.transform = "rotate(0deg)";
//         Element2.style.display = "none";
//     }
// }

// // Access the element and add onclick event
// document.getElementById("arrowIcon1").onclick = function() {
//     rotateSVGSmoothly("arrowIcon1","article1");
// };
// document.getElementById("arrowIcon2").onclick = function() {
//     rotateSVGSmoothly("arrowIcon2","article2");
// };
// document.getElementById("arrowIcon3").onclick = function() {
//     rotateSVGSmoothly("arrowIcon3","article3");
// };
// document.getElementById("arrowIcon4").onclick = function() {
//     rotateSVGSmoothly("arrowIcon4","article4");
// };


function rotateSVGSmoothly(element, element2) {
    var svgElement = document.getElementById(element);
    var Element2 = document.getElementById(element2);

    // Apply transition property
    svgElement.style.transition = "transform 0.5s ease";

    // Check current rotation and rotate accordingly
    if (svgElement.style.transform === "rotate(0deg)" || svgElement.style.transform === "") {
        // Rotate the SVG by 180 degrees
        svgElement.style.transform = "rotate(180deg)";
        Element2.style.display = "block";
    } else {
        // Reset rotation to default (0 degrees)
        svgElement.style.transform = "rotate(0deg)";
        Element2.style.display = "none";
    }
}

// Function to hide the article element
function hideElement(elementId) {
    var element = document.getElementById(elementId);
    element.style.display = "none";
}

// Access the elements and add onclick events
document.getElementById("arrowIcon1").onclick = function(event) {
    event.stopPropagation(); // Prevents the click event from bubbling up to the document
    rotateSVGSmoothly("arrowIcon1", "article1");
};
document.getElementById("arrowIcon2").onclick = function(event) {
    event.stopPropagation(); // Prevents the click event from bubbling up to the document
    rotateSVGSmoothly("arrowIcon2", "article2");
};
document.getElementById("arrowIcon3").onclick = function(event) {
    event.stopPropagation(); // Prevents the click event from bubbling up to the document
    rotateSVGSmoothly("arrowIcon3", "article3");
};
document.getElementById("arrowIcon4").onclick = function(event) {
    event.stopPropagation(); // Prevents the click event from bubbling up to the document
    rotateSVGSmoothly("arrowIcon4", "article4");
};

// Add event listener to document to hide displayed element on click outside of the arrow icons and rotate SVG
document.addEventListener("click", function(event) {
    var clickedElementId = event.target.id;
    if (clickedElementId !== "arrowIcon1" && clickedElementId !== "arrowIcon2" && clickedElementId !== "arrowIcon3" && clickedElementId !== "arrowIcon4") {
        hideElement("article1");
        hideElement("article2");
        hideElement("article3");
        hideElement("article4");
        
        // Rotate the SVG back to default position
        var svgElement = document.getElementById("arrowIcon1");
        svgElement.style.transform = "rotate(0deg)";
        var svgElement = document.getElementById("arrowIcon2");
        svgElement.style.transform = "rotate(0deg)";
        var svgElement = document.getElementById("arrowIcon3");
        svgElement.style.transform = "rotate(0deg)";
        var svgElement = document.getElementById("arrowIcon4");
        svgElement.style.transform = "rotate(0deg)";
    }
});
