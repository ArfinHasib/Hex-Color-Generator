const container = document.querySelector(".container");
const refreshBtn = document.querySelector(".refresh-btn");

let maxPaletteBoxes = 16; // Number of palette you want to show on the screen

// Generate the palette
const generatePalette = () => {
    container.innerHTML = ""; // Clearing the container

    for (let i = 0; i < maxPaletteBoxes; i++) {
        // Generate a random hex color code
        let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
        randomHex = `#${randomHex.padStart(6, "0")}`;

        // Creating a new "li" element and append it to the container
        const color = document.createElement("li");
        color.classList.add("color");
        color.innerHTML = `
                            <div class="rect-box" style="background: ${randomHex}"></div>
                            <span class="hex-value">${randomHex}</span>
        `;

        // Adding click event to current li element to copy the color code
        color.addEventListener("click", () => copyColor(color, randomHex));

        container.appendChild(color);
    }
};

// Copy the hex color code to the keyboard
const copyColor = (elem, hexVal) => {
    const colorElement = elem.querySelector(".hex-value");

    // Copying the hex value, updating the text to be copied.
    // and then changing text back tyo the original hex value after a second
    navigator.clipboard
        .writeText(hexVal)
        .then(() => {
            colorElement.innerText = "Copied";
            setTimeout(() => (colorElement.innerText = hexVal), 1000);
        })
        .catch(() => (colorElement.innerText = "Failed"));
};

generatePalette();

refreshBtn.addEventListener("click", generatePalette);
