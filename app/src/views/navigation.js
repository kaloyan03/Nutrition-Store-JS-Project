import { html, nothing } from '../lib.js';

import { logoutUser } from '../services/authService.js';
import { clearSessionStorage } from '../utils.js';
import { getAccessToken, getUserEmail } from '../utils.js';

const navTemplate = (model) => html`
<section class='nav-section'>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">KaliNutrition</a>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link ${model['currentPath'] == '/supplements' ? 'active' : ''}" aria-current="page" href="/supplements">Supplements</a>
        </li>

        <li class="nav-item">
          <a class="nav-link ${model['currentPath'] == '/calorie-intake-calculator' ? 'active' : ''}" aria-current="page" href="/calorie-intake-calculator">Calculate Caloric Needs</a>
        </li>
        ${model['isAuthorized']
      ? html`
        <li class="nav-item">
          <a class="nav-link ${model['currentPath'] == '/add-supplement' ? 'active' : ''}" aria-current="page" href="/add-supplement">Add Supplement</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)" @click=${model['logoutHandler']}>Logout</a>
        </li>

        <li class="nav-item">
          <p class="nav-link" style="font-weight: bold; position: absolute; right: 40px;">Hello, ${model['email']}</p>
        </li>
      `
      : html`
      <li class="nav-item">
          <a class="nav-link ${model['currentPath'] == '/login' ? 'active' : ''}" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${model['currentPath'] == '/register' ? 'active' : ''}" href="/register">Register</a>
        </li>
      `}
      </ul>
    </div>
  </div>
</nav>
</section>
`

let context = undefined;

function logoutHandler() {
  logoutUser().then(() => {
    clearSessionStorage();
    context.page.redirect('/login');
  })
}


function viewNav(cntxt, next) {
  context = cntxt;
  let viewModel = {
    logoutHandler,
    currentPath: context.pathname,
    isAuthorized: Boolean(getAccessToken()),
    email: getUserEmail(),
  }

  let templateResult = navTemplate(viewModel);

  cntxt.renderNav(templateResult);
  next();
}

export default {
  viewNav,
}