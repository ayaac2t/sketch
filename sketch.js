const grid = document.getElementById("grid");

let isDrawing = false;
let isColorMode = false;
let isBrightMode = false;
let isBlackMode = false;
let isEraseMode = false;

function paintCell(cell) {
    let count = Number(cell.dataset.count);

    if (isEraseMode) {
        cell.style.backgroundColor = "";
        cell.dataset.count = 0;
        delete cell.dataset.r;
        delete cell.dataset.g;
        delete cell.dataset.b;
        return;
    }

    if (isBlackMode) {
        cell.style.backgroundColor = "#000";
        return;
    }

    if (isBrightMode) {
        if (isColorMode) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        } else {
            cell.style.backgroundColor = "#fff";
        }
        return;
    }

    if (count >= 10) return;

    count++;
    cell.dataset.count = count;

    if (isColorMode) {

        if (!cell.dataset.r) {
            cell.dataset.r = Math.floor(Math.random() * 256);
            cell.dataset.g = Math.floor(Math.random() * 256);
            cell.dataset.b = Math.floor(Math.random() * 256);
        }

        const factor = 1 - count / 10;

        const r = Math.floor(Number(cell.dataset.r) * factor);
        const g = Math.floor(Number(cell.dataset.g) * factor);
        const b = Math.floor(Number(cell.dataset.b) * factor);

        cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    } else {

        const value = 255 - Math.floor(count * 25.5);
        cell.style.backgroundColor = `rgb(${value}, ${value}, ${value})`;

    }
}

function createGrid(size) {

    grid.innerHTML = "";

    const cellSize = 512 / size;

    for (let i = 0; i < size * size; i++) {

        const cell = document.createElement("div");

        cell.classList.add("cell");

        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.style.boxSizing = "border-box";

        cell.dataset.count = 0;

        cell.addEventListener("mouseover", () => {
            if (isDrawing) {
                paintCell(cell);
            }
        });

        cell.addEventListener("mousedown", () => {
            isDrawing = true;
            paintCell(cell);
        });

        grid.appendChild(cell);
    }
}

document.addEventListener("mouseup", () => {
    isDrawing = false;
});

document.addEventListener("dragstart", e => e.preventDefault());

function toggleBtn(btn, state) {
    btn.classList.toggle("active", state);
}

document.getElementById("newGrid").addEventListener("click", () => {

    let size = parseInt(prompt("How many squares per side? (max 100)"));

    if (isNaN(size) || size < 1) {
        alert("Please enter a valid number!");
        return;
    }

    if (size > 100) {
        alert("Maximum is 100!");
        return;
    }

    createGrid(size);
});

document.getElementById("colorMode").addEventListener("click", () => {

    isColorMode = !isColorMode;

    const btn = document.getElementById("colorMode");

    btn.innerHTML = isColorMode
        ? "Color<br>Mode<br>ON"
        : "Color<br>Mode<br>OFF";

    toggleBtn(btn, isColorMode);
});

document.getElementById("brightMode").addEventListener("click", () => {

    isBrightMode = !isBrightMode;

    if (isBrightMode) isBlackMode = false;

    const btn = document.getElementById("brightMode");

    btn.innerHTML = isBrightMode
        ? "Bright<br>Mode<br>ON"
        : "Bright<br>Mode<br>OFF";

    toggleBtn(btn, isBrightMode);
    toggleBtn(document.getElementById("blackMode"), false);
});

document.getElementById("blackMode").addEventListener("click", () => {

    isBlackMode = !isBlackMode;

    if (isBlackMode) isBrightMode = false;

    const btn = document.getElementById("blackMode");

    btn.innerHTML = isBlackMode
        ? "Black<br>Mode<br>ON"
        : "Black<br>Mode<br>OFF";

    toggleBtn(btn, isBlackMode);
    toggleBtn(document.getElementById("brightMode"), false);
});

document.getElementById("eraseMode").addEventListener("click", () => {

    isEraseMode = !isEraseMode;

    const btn = document.getElementById("eraseMode");

    btn.innerHTML = isEraseMode
        ? "Erase<br>ON"
        : "Erase<br>OFF";

    toggleBtn(btn, isEraseMode);
});

createGrid(16);
