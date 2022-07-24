const canvas = document.querySelector('#canvas');
const slider = document.querySelector('#slider');
const output = document.querySelector('#output');

//Sets grid number
function makeGrid(number) {
    gridNum = number * number;

    for (let i = 0; i < gridNum; i++) {
        grid = document.createElement('div');
        grid.style.width = `${100/number}%`;
        grid.style.height = `${100/number}%`;
        grid.style.backgroundColor = getRandomColor();
        canvas.appendChild(grid);
    }
}

//Event listener keeps appending when you use make grid. Clear canvas makes sure the previous canvas is gone so the new one can replace it.
function clearCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

console.log(slider.value)
console.log(canvas.clientWidth)


output.textContent = slider.value;

makeGrid(slider.value)



slider.addEventListener('input',
    function() {
        output.innerText = `${this.value} x ${this.value}`;
        clearCanvas();
        makeGrid(slider.value);
    });