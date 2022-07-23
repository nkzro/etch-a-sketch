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
        canvas.appendChild(grid);
    }
}

function clearCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

console.log(slider.value)
console.log(canvas.clientWidth)


output.textContent = slider.value;

makeGrid(slider.value)



slider.addEventListener('input',
    function() {
        output.textContent = this.value;
        clearCanvas();
        makeGrid(slider.value);
    });