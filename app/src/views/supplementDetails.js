import { html, nothing } from '../lib.js';

import { getSupplement } from '../services/supplementsService.js';

const supplementDetailsTemplate = (model) => html`
<section class='supplement-details-page' style="max-width:600px; margin: 50px auto;">
<h2 style="text-align: center;">Supplement Details</h2>
<div class="card mb-3">
  <img src=${model['supplementData']['image']} class="card-img-top" style="max-width:600px" alt="supplementPhoto">
  <div class="card-body">
    <h5 class="card-title">${model['supplementData']['name']}</h5>
    <p class="card-text">Brand: ${model['supplementData']['brand']}</p>
    <p class="card-text">Description: ${model['supplementData']['description']}</p>
    <p class="card-text">Category: ${model['supplementData']['category']}</p>
    <a href="/supplements/update/${model['supplementData']['_id']}" class="btn btn-warning">Update</a>
    <a class="btn btn-danger">Delete</a>
    <a class="btn btn-success">Buy</a>
  </div>
</div>
</section>
`

let context = undefined;
let supplementId = undefined;

function viewPage(cntxt) {
    supplementId = cntxt.params['id'];
    getSupplement(supplementId)
    .then(data => {
        context = cntxt;
        let viewModel = {
            'supplementData': data,
        }
  
        let templateResult = supplementDetailsTemplate(viewModel);
  
        cntxt.renderView(templateResult);
    })
  }
  
  export default {
    viewPage,
  }