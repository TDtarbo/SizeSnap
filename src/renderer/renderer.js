const scrollToOptionsBtn = document.getElementById("scrollToOptionsBtn");
const goBackBtn = document.getElementById("goBackBtn");
const resizeBtn = document.getElementById("resizeBtn");
const browseOutputDirBtn = document.getElementById("browseOutputDirBtn");
const optionsSection = document.getElementById("optionsSection");
const inputSection = document.getElementById("inputSection");
const dropZone = document.getElementById("dropZone");
const outputDirInput = document.getElementById("outputDirInput");
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const optionsForm = document.getElementById("options");
const minimizeBtn = document.getElementById("minimize");
const maximizeBtn = document.getElementById("maximize");
const closeBtn = document.getElementById("close");
const parentContainer = document.querySelector(".sections");
const notificationContainer = document.querySelector(".alert-section");

const optionsSectionPosition = optionsSection.offsetLeft;
const inputSectionPosition = inputSection.offsetLeft;

let imgPath = null;

optionsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    resizeBtn.innerHTML = ` <div class="loading-container">
    <div class="loading-circle"></div>
    Processing...
</div>`;
    toggleBtnState(goBackBtn);
    toggleBtnState(resizeBtn);

    const formData = new FormData(optionsForm);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    formObject.path = imgPath;

    try {
        const res = await api.resizeImage(formObject);

        if (res == "error") {
            notification("Image resize failed.");
        } else {
            notification("Image resize finished.");
        }
    } catch (error) {
        notification("Image resize failed.");
    }

    resizeBtn.innerHTML = "Resize";
    toggleBtnState(goBackBtn);
    toggleBtnState(resizeBtn);
});

const toggleBtnState = (btn) => {
    if (btn.disabled) {
        btn.disabled = false;
        btn.style.cursor = "pointer";
    } else {
        btn.disabled = true;
        btn.style.cursor = "not-allowed";
    }
};

browseOutputDirBtn.addEventListener("click", async () => {
    try {
        const res = await api.openDirPicker();
        if (!res) {
            return;
        } else {
            outputDirInput.value = res;
        }
    } catch (error) {
        notification("Oops! Something went wrong.");
    }
});

scrollToOptionsBtn.addEventListener("click", async () => {
    if (!imgPath) {
        notification("Please select an image to resize.");
        return;
    } else {
        try {
            const res = await api.defaultOutputDir();
            outputDirInput.value = res;
            parentContainer.scrollTo({
                left: optionsSectionPosition,
                behavior: "smooth",
            });
        } catch (error) {
            notification("Oops! Something went wrong.");
        }
    }
});

goBackBtn.addEventListener("click", () => {
    parentContainer.scrollTo({
        left: inputSectionPosition,
        behavior: "smooth",
    });
});

dropZone.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const res = await api.openFilePicker();
        if (!res) {
            return;
        } else {
            imgPath = res;
            dropZone.innerHTML = `
            <img id="uploadedImg" src="${imgPath}" alt="uploaded image" />`;

            const ImageObj = new Image();
            ImageObj.src = res;
            ImageObj.onload = function () {
                heightInput.value = ImageObj.height;
                widthInput.value = ImageObj.width;
            };
        }
    } catch (error) {
        notification("Oops! Something went wrong.");
    }
});

minimizeBtn.addEventListener("click", () => {
    api.windowMinimize();
});

maximizeBtn.addEventListener("click", () => {
    api.windowMaximize();
});

closeBtn.addEventListener("click", () => {
    api.windowClose();
});

const notification = (message) => {
    notificationContainer.innerHTML = "";
    const alert = document.createElement("div");
    alert.className = "alert";
    alert.textContent = message;
    notificationContainer.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
};
