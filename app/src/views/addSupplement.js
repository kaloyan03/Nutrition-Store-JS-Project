import { html } from '../lib.js';

import { addSupplement } from '../services/supplementsService.js';

const addSupplementTemplate = (model) => html`
<section class='add-supplement-page'>
  <h2 class='add-supplement-page-title'>Add Supplement</h2>
  <form class="row g-3" @submit=${model['submitHandler']}>
    <div class="col-md-6">
      <label for="supplement-brand" class="form-label">Brand</label>
      <input type="text" name="brand" class="form-control input-field" id="supplement-brand">
    </div>
    <div class="col-md-6">
      <label for="supplement-name" class="form-label">Name</label>
      <input type="text" name="name" class="form-control input-field" id="supplement-name">
    </div>
    <div class="col-md-6">
      <label for="supplement-description" class="form-label">Description</label>
      <textarea class="form-control input-field" name="description" id="supplement-description"></textarea>
    </div>
    <div class="col-md-4">
      <label for="supplement-category" class="form-label">Category</label>
      <select id="supplement-category" name="category" class="form-select">
        <option selected>Choose...</option>
        <option>protein</option>
        <option>creatine</option>
      </select>
    </div>
    <div class="col-md-6">
      <label for="supplement-image" class="form-label">Image Url</label>
      <input type="text" name="image" class="form-control input-field" id="supplement-image">
    </div>

    <div class="col-md-6">
      <label for="supplement-price" class="form-label">Price</label>
      <input type="text" name="price" class="form-control input-field" id="supplement-price">
    </div>

    <div class="col-12">
      <button type="submit" class="btn btn-primary">Add</button>
    </div>
  </form>
</section>
`

let context = undefined;

function addSupplementSubmitHandler(e) {
    e.preventDefault();
    let formElement = e.target;
    let formData = new FormData(formElement);
    
    let brand = formData.get('brand');
    let name = formData.get('name');
    let description = formData.get('description');
    let category = formData.get('category');
    let image = formData.get('image');
    let price = Number(formData.get('price'));
    
    let supplement = {
        brand,
        name,
        description,
        category,
        image,
        price,
    }

    addSupplement(supplement)
    .then(() => {
        context.page.redirect('/supplements')
    })
} 



function viewPage(cntxt) {
  context = cntxt;
  let viewModel = {
      submitHandler: addSupplementSubmitHandler,
  }

  let templateResult = addSupplementTemplate(viewModel);

  // let addSupplementContainerElement = document.querySelector('#add-supplement-page');

  // context.renderView(templateResult, addSupplementContainerElement);
  context.renderView(templateResult);

}

export default {
  viewPage,
}