import { html } from '../lib.js';

import { registerUser } from '../services/authService.js';
import { saveUserToSessionStorage } from '../utils.js';

const registerTemplate = (model) => html`
<section class='register-page' style='text-align:center;  position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);color: white;'>
<h2 style='margin: 10px;'>Register Page</h2>
<form @submit=${model['submitHandler']}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style='width:400px; margin:0 auto;'>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" name="password" class="form-control" id="exampleInputPassword1" style='width:400px; margin:0 auto;'>
  </div>

  <div class="mb-3">
    <label for="confirmPassword" class="form-label">Confirm Password</label>
    <input type="password" name="confirmPassword" class="form-control" id="confirmPassword" style='width:400px; margin:0 auto;'>
  </div>
  <button type="submit" class="btn btn-primary">Sign Up</button>
</form>
</section>
`

let context = undefined;

function registerSubmitHandler(e) {
    e.preventDefault();
    let formElement = e.target;
    let formData = new FormData(formElement);

    let email = formData.get('email');
    let password = formData.get('password');
    let confirmPassword = formData.get('confirmPassword');

    if (email == '' || password == '' || confirmPassword == '') {
        alert('All fields are required!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords must match!');
        return;
    }

    let user = {
        email,
        password,
    }

    formElement.reset();

    registerUser(user)
    .then(data => {
        saveUserToSessionStorage(data['email'], data['accessToken'], data['_id']);
        context.page.redirect('/supplements');
    })
}

function viewPage(cntxt) {
    context = cntxt;
    let viewModel = {
        submitHandler : registerSubmitHandler,
    }

    let templateResult = registerTemplate(viewModel);
    // let registerContainerElement = document.querySelector('#register-page');

    // context.renderView(templateResult, registerContainerElement);
    context.renderView(templateResult);

}

export default {
    viewPage,
}