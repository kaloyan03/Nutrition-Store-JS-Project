import { page, render, html } from './lib.js';


import login from './views/login.js';
import register from './views/register.js';
import supplements from './views/supplements.js';
import navigation from './views/navigation.js';
import addSupplement from './views/addSupplement.js';
import supplementDetails from './views/supplementDetails.js';
import updateSupplement from './views/updateSupplement.js';
import calorieIntakeCalculator from './views/calorieIntakeCalculator.js';
import cart from './views/cart.js';


let navContainer = document.querySelector('.nav-container');
let mainContainer = document.querySelector('.main-container');

page(decorateContext);
page(navigation.viewNav);
page('/', '/supplements');
page('/index.html', '/supplements');
page('/supplements', supplements.viewPage);
page('/login', login.viewPage);
page('/register', register.viewPage);
page('/add-supplement', addSupplement.viewPage);
page('/supplements/:id', supplementDetails.viewPage);
page('/supplements/update/:id', updateSupplement.viewPage);
page('/calorie-intake-calculator', calorieIntakeCalculator.viewPage);
page('/my-cart', cart.viewPage);


page.start();


function decorateContext(cntxt, next) { 
    cntxt.renderView = function(templateResult) { render(templateResult, mainContainer)};
    cntxt.renderNav = function(templateResult) { render(templateResult, navContainer)};
    next();
}