function createModule(value) {
  let img = document.createElement('img');
  let main = document.querySelector('main');

  // Select which module
  img.src = value;
  img.className = 'module-obj';

  img.style.position = 'absolute';
  img.style.top = event.clientY - 43 + 'px';
  img.style.left = event.clientX - 77 + 'px';
  img.style.zIndex = 6;

  let x = 0, y = 0, a = 0, b = 0;
  let init = false;

  main.onmousemove = e => {
    img.style.left = e.clientX - 77 + 'px';
    img.style.top = e.clientY - 43+ 'px';
  }

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

  img.ondblclick = e => {
    
  }

  // Append the module to the main container
  main.appendChild(img);
}

function setLine(line, ox, oy, e) {
  line.setAttribute('x1', ox);
  line.setAttribute('y1', oy);
  line.setAttribute('x2', e.clientX);
  line.setAttribute('y2', e.clientY);
  line.setAttribute('stroke', '#D1CB12')
  line.setAttribute('stroke-width', 3);
  line.setAttribute('stroke-linecap', 'round');
}


function openOptions(value) {
  // Create back button and hide the main menu
  let barMenu = document.getElementById('module-bar-wrapper');
  moduleTitle.innerHTML = 'Back';
  type.style.display = 'block';
  barMenu.style.display = 'none';

  // Set up the title, description, and modules for each type
  setupModules(modules[value], value);

  // Animate the size change
  anime({
    targets: '#module-wrapper',
    height: '558px',
    easing: 'easeOutElastic(1, 1)',
    duration: 800
  });
}

function setupModules(obj, value) {
  // Get the different text items
  let moduleType = document.getElementById('module-type-title');
  let moduleDescrip = document.getElementById('module-type-description');
  let moduleObj = document.getElementById('module-object-wrapper');

  moduleType.innerHTML = obj.title;
  moduleDescrip.innerHTML = obj.description;

  // Cycle through all modules in a type and append them to the panel
  for (let i of obj.links) {
    let img = document.createElement('img');
    img.src = i;
    img.addEventListener('click', () => {
      createModule(i);
    });

    moduleObj.appendChild(img);
  }
}

// Close out and revert to main menu
function closeOptions() {
  let barMenu = document.getElementById('module-bar-wrapper');
  let moduleObj = document.getElementById('module-object-wrapper');
  moduleObj.innerHTML = '';
  moduleTitle.innerHTML = 'Modules';
  type.style.display = 'none';
  barMenu.style.display = 'block';

  anime({
    targets: '#module-wrapper',
    height: '296px',
    easing: 'easeOutElastic(1, 1)',
    duration: 800
  });
}

module.exports = {
  createModule,
  openOptions,
  closeOptions
};
