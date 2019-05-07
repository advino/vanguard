const anime = require('animejs');
const modules = require('./Scripts/module_data.js');
const {createModule, openOptions, closeOptions, setLine} = require('./Scripts/module_panel.js');

let bars = document.getElementsByClassName('module-bar');
let type = document.getElementById('module-type-wrapper');
let moduleTitle = document.getElementById('module-wrapper-title');
let screenImg = document.getElementById('screen-image');

let count = 0;

insertWireframe('./Scripts/Core/Core Module.svg');

// Create a back button to return to the main menu
moduleTitle.addEventListener('click', e => {
  closeOptions();
});

for (let b of bars) {
  // Bind createModules functions to generated module
  b.addEventListener('click', e => {
    openOptions(b.title);
  });
}

document.addEventListener('keypress', e => {
  count++;
  screenImg.src = `./Style/Assets/Images/${count}.png`;
});

function insertWireframe(value) {
  let img = document.createElement('img');
  let main = document.querySelector('main');

  // Select which module
  img.src = value;
  img.className = 'module-obj';

  img.style.position = 'absolute';
  img.style.top = 20 + 'px';
  img.style.left = 20 + 'px';
  img.style.zIndex = 6;

  let x = 0, y = 0, a = 0, b = 0;
  let init = false;

  img.onmousedown = e => {
    e.preventDefault();
    img.style.zIndex = 1;

    a = e.clientX;
    b = e.clientY;

    let s = document.querySelector('svg');
    let l = document.createElementNS('http://www.w3.org/2000/svg','line');
    s.appendChild(l);

    let oX = e.clientX;
    let oY = e.clientY;

    main.onmousemove = e => {
      e.preventDefault();
      x = a - e.clientX;
      y = b - e.clientY;
      a = e.clientX;
      b = e.clientY;

      let loc = e.clientX - img.offsetLeft;
      if(15 < loc && loc < 147) {
        img.style.top = (img.offsetTop - y) + 'px';
        img.style.left = (img.offsetLeft - x) + 'px';
      } else {
          if(loc < 15) {
            oX = img.offsetLeft + 8;
            oY =  img.offsetTop + 45;
          } else if(147 < loc) {
            oX = img.offsetLeft + 157;
            oY =  img.offsetTop + 45;
          }
          setLine(l, oX, oY, e);
      }
    }

    main.onmouseup = e => {
      main.onmousemove = null;
      if(e.target.className == 'module-obj') {
        let finalX = parseInt(e.target.style.left) + 8;
        let finalY = parseInt(e.target.style.top) + 45;
        l.setAttribute('x2', finalX);
        l.setAttribute('y2', finalY);
        l = null;
      } else {
        s.removeChild(l);
      }
    }
  }

  // Append the module to the main container
  main.appendChild(img);
}
