import { html, nothing } from '../lib.js';

import { getSupplements } from '../services/supplementsService.js';
import { getAccessToken } from '../utils.js';


const supplementTemplate = (supplementData, isAuthorized) => html`
<div class="card">
  <img src="${supplementData['image']}" class="card-img-top card-img">
  <div class="card-body">
    <h4 class="card-title">${supplementData['name']}</h4>
    <p class="card-text price">Price: €${supplementData['price']}</p>
    <p class="card-text">Category: ${supplementData['category']}</p>
    ${isAuthorized == false
    ? html`
    <a href="/supplements/${supplementData['_id']}" type="button" class="btn btn-primary details-btn disabled">Details</a>
    <h6 class='access-button-message'>Supplement details are available only for logged in users</h6>
    `
    : html`
    <a href="/supplements/${supplementData['_id']}" type="button" class="btn btn-primary details-btn">Details</a>
    `}
  </div>
</div>
`

const supplementsTemplate = (model) => html`
    <section class='supplements-page'>
    <h2 class='supplements-page-title'>Supplements list</h2>

    <div class="cards-box">
    ${model['supplements']
    ?
    html`${model['supplements'].map(s => supplementTemplate(s, model['isAuthorized']))}`
    :
    html`<p class="no-supplements">No supplements in database.</p>`
    }
    </div>

    </section>
`

let context = undefined;

function viewPage(cntxt) {
    context = cntxt;
    getSupplements()
    .then(data => {
        let viewModel = {
            supplements: Object.values(data),
            isAuthorized: Boolean(getAccessToken()), 
        }

        let templateResult = supplementsTemplate(viewModel);
        // let supplementsContainerElement = document.querySelector('#supplements-page');

        // cntxt.renderView(templateResult, supplementsContainerElement);
        context.renderView(templateResult);

    })

}

export default {
    viewPage,
}