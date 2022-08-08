const canvas = document.querySelector('#canvas');
const slider = document.querySelector('#slider');
const output = document.querySelector('#output');
const picker = document.querySelector('#color-picker');
const rainbow = document.querySelector('#rainbow');
const shade = document.querySelector('#shade');
const modes = document.querySelectorAll('.mode');
const cells = canvas.childNodes;

//Sets grid number
function makeGrid(number) {
    gridNum = number * number;
    
    for (let i = 0; i < gridNum; i++) {
        const grid = document.createElement('div');
        grid.classList.add('cell');
        grid.style.width = `${100/number}%`;
        grid.style.height = `${100/number}%`;
        // grid.style.backgroundColor = 'white';
        canvas.appendChild(grid);
    }

    
    modes.forEach(mode => {
        let tempShade = modes[0];
        let tempRainbow = modes[1];
        let tempColor = modes[2];
        mode.addEventListener('click', () => {
            if (mode === tempShade){
                tempShade.classList.add('active');
                tempRainbow.classList.remove('active');
                tempColor.classList.remove('active');
                // sketch('shade');
            }
            else if (mode === tempRainbow) {
                tempShade.classList.remove('active');
                tempRainbow.classList.add('active');
                tempColor.classList.add('active');
                // sketch('rainbow')
            }
            else if (mode === tempColor) {
                tempShade.classList.remove('active');
                tempRainbow.classList.remove('active');
                tempColor.classList.add('active');
                // sketch('color-picker')
            }

            sketch(mode.id);
            if (mode.classList.contains('active')) {
                console.log(tempShade);
            }
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


// function makeShade() {
//     console.log(cellColor)
//     return cellColor;
// }

function sketch(mode) {
    cells.forEach(cell => {
        if (mode === 'rainbow') {
            cell.addEventListener('mouseenter', () => {
                let cellColor;
                cellColor = getRandomColor();
                cell.style.backgroundColor = cellColor;
            });
        }
        else if (mode === 'color-picker') {
            cell.addEventListener('mouseenter', () => {
                let cellColor;
                cellColor = getColor();
                cell.style.backgroundColor = cellColor;
            });
        }
        else if (mode === 'shade') {
            cell.addEventListener('mouseenter', () => {
                let cellColor = cell.style.backgroundColor;
                console.log(cellColor)
            })
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
