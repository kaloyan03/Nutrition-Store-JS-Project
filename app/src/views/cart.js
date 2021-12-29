import { html } from '../lib.js';

import { getCartSupplements, removeSupplementIdFromLocalstorage, removeAllSupplementsFromLocalstorage } from '../utils.js';
import { getSupplements } from '../services/supplementsService.js';

const tbodyTemplate = (product, removeHandler) => html`
<tr>
      <td><img src="${product['image']}" style="max-width: 150px;"></td>
      <td>${product['name']}</td>
      <td>${product['category']}</td>
      <td>${product['quantity']}</td>
      <td>€${product['price']}</td>
      <td><button class="btn btn-danger" dataset-id="${product['_id']}" @click=${removeHandler}>Remove</button></td>
    </tr>
`

const cartTemplate = (model) => html`
<section class="cart-page" style="color: white;max-width:1100px; margin:80px auto;">
    <h2 style="text-align: center;">My cart</h2>
    ${model['products'].length !== 0
    ? html`
    <table class="table" style="color:white; height: 300px" >
  <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
  ${model['products'].map(p => tbodyTemplate(p, model['removeHandler']))}
  </tbody>
    <tfoot>
    <tr style="font-weight: bold;">
      <td>Total:</td>
      <td></td>
      <td></td>
      <td></td>
      <td>€${model['totalSum'].toFixed(2)}</td>
      <td></td>
    </tr>
    </tfoot>
</table>
  <article style="text-align: center; margin-top:50px;">
    <h4>Please, verify your email to send you more details about your order!</h4>
    <input class="form-control" id="email" style="width:380px; margin: 0 auto;" type='text'>
    <button class="btn btn-success" style="margin-top: 20px;" @click=${model['sendHandler']}>Send</button>
  </article>
    `
    : html`
    <h3 style="text-align: center; margin-top:100px";>There are no products yet.</h3>
    `}
</section>
`

let context = undefined;
let myProductsObj = {};
let totalSum = 0;


function removeButtonHandler(e) {
  let productToRemoveId = e.target.getAttribute('dataset-id');
  removeSupplementIdFromLocalstorage(productToRemoveId);
  context.page.redirect('/my-cart');
}

function sendEmailButton() {
  let emailInputElement = document.querySelector('#email');
  let email = emailInputElement.value;
  
  if (email == '') {
    alert('Email must be entered');
    return;
  }

  let emailBody = [];

  Object.values(myProductsObj).forEach(product => emailBody.push(`product name: ${product['name']}, product quantity: ${product['quantity']}, product price: ${product['price']}`))

  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "kaloqnbg076@gmail.com",
    Password : "2B12FE2424EA7E330E7C47E54646A2EA5CEF",
    To : email,
    From : "kaloqnbg076@gmail.com",
    Subject : "Information about your order :) !",
    Body : `Your order consists of: ${emailBody.join('; ')}      Total price: ${totalSum}`
}).then(
  message => alert(message)
);
  removeAllSupplementsFromLocalstorage();
  context.page.redirect('/my-cart');

}


function viewPage(cntxt) {
    context = cntxt;

    getSupplements()
    .then(supplements => {
        let savedProducts = getCartSupplements();
        let myProducts = savedProducts ? Object.values(supplements).filter((el) => savedProducts.includes(el['_id'])) : [];
        myProductsObj = {}
        myProducts.forEach(product => {
          let currentQuantity = 0;
          savedProducts.forEach(el => {
            if (el == product['_id']) {
              currentQuantity++;
            }
          })
          myProductsObj[product['_id']] = {'quantity': currentQuantity, 'name': product['name'], 'price': product['price'], 'category': product['category'], 'image': product['image'], '_id': product['_id']}
        })
        Object.values(myProductsObj).forEach(product => totalSum += Number(product['price']) * Number(product['quantity']))
        let viewModel = {
        products: Object.values(myProductsObj),
        totalSum,
        removeHandler: removeButtonHandler,
        sendHandler: sendEmailButton,
    }

        let templateResult = cartTemplate(viewModel);
        context.renderView(templateResult);
        })

}

export default {
    viewPage,
}