import { html } from '../lib.js';

import { getCartSupplements } from '../utils.js';
import { getSupplements } from '../services/supplementsService.js';

const tbodyTemplate = (product) => html`
<tr>
      <td>${product['name']}</td>
      <td>${product['category']}</td>
      <td>€${product['price']}</td>
    </tr>
`

const cartTemplate = (model) => html`
<section class="cart-page" style="color: white;max-width:1100px; margin:80px auto;">
    <h2 style="text-align: center;">My cart</h2>
    <table class="table" style="color:white; height: 300px" >
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    ${model['products']
    ? html`${model['products'].map(p => tbodyTemplate(p))}`
    : html`
    <p>There are no products yet.</p>
    `}
  </tbody>
    <tfoot>
    <tr>
      <td>Total:</td>
      <td>€${model['totalSum'].toFixed(2)}</td>
    </tr>
    </tfoot>
</table>
</section>
`

let context = undefined;

function viewPage(cntxt) {
    context = cntxt;

    getSupplements()
    .then(supplements => {
        let myProducts = Object.values(supplements).filter((el) => getCartSupplements().includes(el['_id']));
        let totalSum = 0;
        myProducts.forEach(product => totalSum += Number(product['price']))
        let viewModel = {
        products: myProducts,
        totalSum,
    }

        let templateResult = cartTemplate(viewModel);
        context.renderView(templateResult);
        })

}

export default {
    viewPage,
}