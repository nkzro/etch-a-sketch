const canvas = document.querySelector('#canvas');

function makeGrid(number) {
    gridNum = number * number;

    for (let i = 0; i < gridNum; i++) {
        grid = document.createElement('div');
        grid.style.width = `${100/number}%`;
        grid.style.height = `${100/number}%`;
        canvas.appendChild(grid);
        console.log(grid.clientHeight);
    }

}

console.log(canvas.clientHeight)
console.log(canvas.clientWidth)

makeGrid(50);