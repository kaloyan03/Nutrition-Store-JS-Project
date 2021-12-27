import { html } from '../lib.js';

import { getSupplements } from '../services/supplementsService.js';


const supplementTemplate = (supplementData) => html`
<div class="card" style="width: 18rem; margin:40px;">
  <img src="${supplementData['image']}" class="card-img-top">
  <div class="card-body">
    <h4 class="card-title">${supplementData['name']}</h4>
    <p class="card-text" style="font-weight: 500;">Price: ${supplementData['price']}€</p>
    <p class="card-text">Category: ${supplementData['category']}</p>
    <a href="/supplements/${supplementData['_id']}" class="btn btn-primary">Details</a>
  </div>
</div>
`

const supplementsTemplate = (model) => html`
    <section class='supplements-page' style='text-align: center;'>
    <h2 style="margin:30px;">Supplements list</h2>

    <div class="cards-box" style="display: flex; width: 1200px; margin: 0 auto; flex-direction: row; flex-wrap: wrap;">
    ${model['supplements']
    ?
    html`${model['supplements'].map(s => supplementTemplate(s))}`
    :
    html`<p class="no-supplements">No supplements in database.</p> -->`
    }
    </div>

    </section>
`

function viewPage(cntxt) {
    getSupplements()
    .then(data => {
        let viewModel = {
            'supplements': Object.values(data),
        }

        let templateResult = supplementsTemplate(viewModel);

        cntxt.renderView(templateResult);
    })

}

export default {
    viewPage,
}