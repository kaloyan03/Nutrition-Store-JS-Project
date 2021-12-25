import { html } from '../lib.js';

import { getSupplements } from '../services/supplementsService.js';


const supplementTemplate = (supplementData) => html`
<div class="card" style="width: 18rem;">
  <img src="${supplementData['image']}" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${supplementData['name']}</h5>
    <p class="card-text">Price: ${supplementData['price']}</p>
    <a href="/supplements/${supplementData['_id']}" class="btn btn-primary">Details</a>
  </div>
</div>
`

const supplementsTemplate = (model) => html`
    <h1>Supplements list</h1>

    ${model['supplements']
    ?
    html`${model['supplements'].map(s => supplementTemplate(s))}`
    :
    html`<p class="no-supplements">No supplements in database.</p> -->`
    }
    
    
`

function viewPage(cntxt) {
    getSupplements()
    .then(data => {
        let viewModel = {
            'supplements': data,
        }

        let templateResult = supplementsTemplate(viewModel);

        cntxt.renderView(templateResult);
    })

}

export default {
    viewPage,
}