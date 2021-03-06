import { html } from '../lib.js';

import { saveUserToSessionStorage } from '../utils.js';
import { loginUser } from '../services/authService.js';

const loginTemplate = (model) => html`
<section class='login-page'>
<h2 class="login-page-title">Login Page</h2>
<form @submit=${model['submitHandler']}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" name='email' class="form-control input-field" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" name='password' class="form-control input-field" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Sign In</button>
</form>
</section>
`

let context = undefined;


function loginSubmitHandler(e) {
    e.preventDefault();
    let formElement = e.target;
    let formData = new FormData(formElement);

    let email = formData.get('email');
    let password = formData.get('password');

    if (email == '' || password == '') {
        alert('All fields are required!');
        return;
    }

    let user = {
        email,
        password,
    }

    formElement.reset()
    

    loginUser(user)
    .then(data => {
        saveUserToSessionStorage(data['email'], data['accessToken'], data['_id']);
        context.page.redirect('/supplements');
    })
}


function viewPage(cntxt) {
    context = cntxt;
    let viewModel = {
        submitHandler: loginSubmitHandler,
    }


    let templateResult = loginTemplate(viewModel);

    // let loginContainerElement = document.querySelector('#login-page');

    // context.renderView(templateResult, loginContainerElement);
    context.renderView(templateResult);

}

export default {
    viewPage,
}