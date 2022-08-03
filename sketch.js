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
        grid.style.backgroundColor = 'rgb(255, 255, 255)';
        canvas.appendChild(grid);
    }
    
    modes.forEach(mode => {
        mode.addEventListener('click', () => {
            mode.classList.add('active');

            if (mode.classList.contains('active')) {
                sketch(mode.id);
            }
        })
    });
}

//Event listener keeps appending when you use makeGrid(). clearCanvas() makes sure the previous canvas is gone so the new one can replace it.
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


function makeShade(cell) {
    let rgbValue = colorValues(`${cell.style.backgroundColor}`);
    let hue = rgb2hue(rgbValue[0], rgbValue[1], rgbValue[2]);
    let saturation = rgb2saturation(rgbValue[0], rgbValue[1], rgbValue[2]);
    let lightness = rgb2lightness(rgbValue[0], rgbValue[1], rgbValue[2]);

    console.log(`hsl(${hue}, ${saturation}%,  ${lightness}%)`)

    return `hsl(${hue}, ${saturation}%,  ${lightness - 10}%)`;
}

function activate (mode) {
    mode.classList.add('active');
}

function sketch(mode) {
    cells.forEach(cell => {
        switch(mode) {
            case 'rainbow':
                cell.addEventListener('mouseover', () => {
                    cell.style.backgroundColor = getRandomColor();
                });
                break;

            case 'color-picker':
                cell.addEventListener('mouseover', () => {
                    cell.style.backgroundColor = getColor();
                });
                break;
            case 'shade':
                cell.addEventListener('mouseover', () => {
                    cell.style.backgroundColor = makeShade(cell);
                })
                break;
            default:
                // cell.style.bk
        }
    });
}

output.innerText = `${slider.value} x ${slider.value}`;
makeGrid(slider.value)

//Event Listeners


slider.addEventListener('input',
    function() {
        output.innerText = `${this.value} x ${this.value}`;
        clearCanvas();
        makeGrid(slider.value);
});





//This will convert RGB color values to HSL.
function rgb2hue(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    // Calculate hue
    // No difference
    if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
      
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
  
    // Calculate lightness
    l = (cmax + cmin) / 2;
  
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return h;
}

function rgb2saturation(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    // Calculate hue
    // No difference
    if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
      
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
  
    // Calculate lightness
    l = (cmax + cmin) / 2;
  
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

     return s;
}

function rgb2lightness (r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    // Calculate hue
    // No difference
    if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
      
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
  
    // Calculate lightness
    l = (cmax + cmin) / 2;
  
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return l;
}

// return array of [r,g,b,a] from any valid color. if failed returns undefined
function colorValues(color)
{
    if (color === '')
        return;
    if (color.toLowerCase() === 'transparent')
        return [0, 0, 0, 0];
    if (color[0] === '#')
    {
        if (color.length < 7)
        {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        return [parseInt(color.substr(1, 2), 16),
            parseInt(color.substr(3, 2), 16),
            parseInt(color.substr(5, 2), 16),
            color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
    }
    if (color.indexOf('rgb') === -1)
    {
        // convert named colors
        var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
        var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
        temp_elem.style.color = flag;
        if (temp_elem.style.color !== flag)
            return; // color set failed - some monstrous css rule is probably taking over the color of our object
        temp_elem.style.color = color;
        if (temp_elem.style.color === flag || temp_elem.style.color === '')
            return; // color parse failed
        color = getComputedStyle(temp_elem).color;
        document.body.removeChild(temp_elem);
    }
    if (color.indexOf('rgb') === 0)
    {
        if (color.indexOf('rgba') === -1)
            color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
        return color.match(/[\.\d]+/g).map(function (a)
        {
            return +a
        });
    }
}

