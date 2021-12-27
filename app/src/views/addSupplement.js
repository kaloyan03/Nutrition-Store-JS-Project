import { html } from '../lib.js';

import { addSupplement } from '../services/supplementsService.js';

const createSupplementTemplate = (model) => html`
<section class='create-supplement-page' style='max-width:1100px; margin:80px auto;'>
  <h2 style='text-align: center;'>Add Supplement</h2>
  <form class="row g-3" @submit=${model['submitHandler']}>
    <div class="col-md-6">
      <label for="supplement-brand" class="form-label">Brand</label>
      <input type="text" name="brand" class="form-control" id="supplement-brand">
    </div>
    <div class="col-md-6">
      <label for="supplement-name" class="form-label">Name</label>
      <input type="text" name="name" class="form-control" id="supplement-name">
    </div>
    <div class="col-md-6">
      <label for="supplement-description" class="form-label">Description</label>
      <textarea class="form-control" name="description" id="supplement-description"></textarea>
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
      <input type="text" name="image" class="form-control" id="supplement-image">
    </div>

    <div class="col-md-6">
      <label for="supplement-price" class="form-label">Price</label>
      <input type="text" name="price" class="form-control" id="supplement-price">
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

  let templateResult = createSupplementTemplate(viewModel);

  cntxt.renderView(templateResult);
}

export default {
  viewPage,
}