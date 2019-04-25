const anime = require('animejs');
const modules = require('./Scripts/module_data.js');
const {createModule, openOptions, closeOptions} = require('./Scripts/module_panel.js');

let bars = document.getElementsByClassName('module-bar');
let type = document.getElementById('module-type-wrapper');
let moduleTitle = document.getElementById('module-wrapper-title');

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
