document.addEventListener("DOMContentLoaded", () => {
    const scrollToOptionsBtn = document.getElementById("scrollToOptionsBtn");
    const goBackBtn = document.getElementById("goBackBtn");
    const optionsSection = document.getElementById("optionsSection");
    const inputSection = document.getElementById("inputSection");
    const parentContainer = document.querySelector('.sections');

    // Get the offsetLeft positions for both sections
    const optionsSectionPosition = optionsSection.offsetLeft;
    const inputSectionPosition = inputSection.offsetLeft;

    scrollToOptionsBtn.addEventListener("click", () => {
        parentContainer.scrollTo({
            left: optionsSectionPosition,
            behavior: "smooth",
        });
    });

    goBackBtn.addEventListener("click", () => {
        parentContainer.scrollTo({
            left: inputSectionPosition, // Fix the direction to left
            behavior: "smooth",
        });
    });
});
