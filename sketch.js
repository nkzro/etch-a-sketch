const canvas = document.querySelector('#canvas');
const slider = document.querySelector('#slider');
const modes = document.querySelectorAll('.mode');
const picker = document.querySelector('#color-picker');
const cells = canvas.childNodes;

//Sets grid number
function makeGrid(number) {
    gridNum = number * number;
    
    for (let i = 0; i < gridNum; i++) {
        const grid = document.createElement('div');
        grid.classList.add('cell');
        grid.style.width = `${100/number}%`;
        grid.style.height = `${100/number}%`;
        grid.style.backgroundColor = 'white';
        canvas.appendChild(grid);
    }
    
    modes.forEach(mode => {
        mode.addEventListener('click', () => {
            sketch(mode.id);
        })
    });
}

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

function getColor() {
    return picker.value;
}

function sketch(mode) {
    cells.forEach(cell => {
        if (mode === 'rainbow') {
            cell.addEventListener('mouseenter', () => {
                let cellColor = getRandomColor();
                cell.style.backgroundColor = getRandomColor();
            });
        }
        else if (mode === 'color-picker') {
            cell.addEventListener('mouseenter', () => {
                let cellColor = getColor();
                cell.style.backgroundColor = cellColor;
                console.log()
            });
        }
        else if (mode === 'erase') {
            cell.addEventListener('mouseenter', () => {
                cell.style.backgroundColor = 'white';
            })
        }
        else if (mode === 'clear') {
            cells.forEach(cell => {
                cell.style.backgroundColor = 'white';
            });
        }
    });
}

output.innerText = `${slider.value} x ${slider.value}`;
makeGrid(slider.value);

slider.addEventListener('input',
    function() {
        output.innerText = `${this.value} x ${this.value}`;
        clearCanvas();
        makeGrid(slider.value);
});
