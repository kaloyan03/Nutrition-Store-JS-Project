import { page, render, html } from './lib.js';


import login from './views/login.js';
import register from './views/register.js';
import supplements from './views/supplements.js';
import navigation from './views/navigation.js';

let mainContainer = document.querySelector('.main-container');
let navContainer = document.querySelector('.nav-container');

page(decorateContext);
page(navigation.viewNav);
page('/supplements', supplements.viewPage);
page('/login', login.viewPage);
page('/register', register.viewPage);

page.start();


function decorateContext(cntxt, next) { 
    cntxt.renderView = function(templateResult) { render(templateResult, mainContainer)};
    cntxt.renderNav = function(templateResult) { render(templateResult, navContainer)};
    next();
}