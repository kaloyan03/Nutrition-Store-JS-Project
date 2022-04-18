import { html } from '../lib.js';

import { getSupplement, updateSupplement } from '../services/supplementsService.js';

const updateSupplementTemplate = (model) => html`
<section class='update-supplement-page'>
  <h2 style='text-align: center;'>Update Supplement</h2>
  <form class="row g-3" @submit=${model['submitHandler']}>
    <div class="col-md-6">
      <label for="supplement-brand" class="form-label">Brand</label>
      <input type="text" name="brand" class="form-control" id="supplement-brand" value=${model['supplementData']['brand']}>
    </div>
    <div class="col-md-6">
      <label for="supplement-name" class="form-label">Name</label>
      <input type="text" name="name" class="form-control" id="supplement-name" value=${model['supplementData']['name']}>
    </div>
    <div class="col-md-6">
      <label for="supplement-description" class="form-label">Description</label>
      <textarea class="form-control" name="description" id="supplement-description">${model['supplementData']['description']}</textarea>
    </div>
    <div class="col-md-4">
      <label for="supplement-category" class="form-label">Category</label>
      <select id="supplement-category" name="category" class="form-select" readonly>
        <option selected>${model['supplementData']['category']}</option>
      </select>
    </div>
    <div class="col-md-6">
      <label for="supplement-image" class="form-label">Image Url</label>
      <input type="text" name="image" class="form-control" id="supplement-image" value=${model['supplementData']['image']}  >
    </div>

    <div class="col-md-6">
      <label for="supplement-price" class="form-label">Price</label>
      <input type="text" name="price" class="form-control" value=${model['supplementData']['price']} id="supplement-price">
    </div>

    <div class="col-12">
      <button type="submit" class="btn btn-primary">Update</button>
    </div>
  </form>
</section>
`

let context = undefined;
let supplementId = undefined;
let _ownerId = undefined;

function updateSupplementSubmitHandler(e) {
    e.preventDefault();
    let formElement = e.target;
    let formData = new FormData(formElement);
    
    let brand = formData.get('brand');
    let name = formData.get('name');
    let description = formData.get('description');
    let category = formData.get('category');
    let image = formData.get('image');
    let price = Number(formData.get('price'));
    let _id = supplementId;
    
    let supplement = {
        brand,
        name,
        description,
        category,
        image,
        price,
        _id,
        _ownerId,
    }

    updateSupplement(supplementId, supplement)
    .then(() => {
        context.page.redirect(`/supplements/${supplementId}`)
    })
} 



function viewPage(cntxt) {
    context = cntxt;
    supplementId = context.params['id'];
    getSupplement(supplementId)
    .then(data => {
        _ownerId = data['_ownerId'];
        let viewModel = {
            submitHandler: updateSupplementSubmitHandler,
            supplementData: data,
            
          }
      
          let templateResult = updateSupplementTemplate(viewModel);
      
          // let updateSupplementContainerElement = document.querySelector('#update-supplement-page');

          // cntxt.renderView(templateResult, updateSupplementContainerElement);
          context.renderView(templateResult);
    })
}

export default {
  viewPage,
}