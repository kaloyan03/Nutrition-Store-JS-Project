import { html } from '../lib.js';

const calorieIntakeCalculatorTemplate = (model) => html`
    <section class='calorie-intake-page' style="max-width:1100px; margin:80px auto;">
    <h2 style='text-align: center;'>BMR Calculator(Daily Calorie Intake)</h2>
    <div class="col-md-6">
      <label for="weight" class="form-label">Weight</label>
      <input type="text" name="weight" class="form-control" id="weight">
    </div>
    <div class="col-md-6">
      <label for="height" class="form-label">Height</label>
      <input type="text" name="height" class="form-control" id="height">
    </div>
    <div class="col-md-6">
      <label for="age" class="form-label">Age</label>
      <input type="text" name="age" class="form-control" id="age">
    </div>
    
    <div class="col-md-4">
      <label for="activity" class="form-label">Activity</label>
      <select id="activity" name="activity" class="form-select">
        <option selected>Choose...</option>
        <option>Sedentary: little or no exercise</option>
        <option>Exercise 1-3 times/week</option>
        <option>Exercise 4-5 times/week</option>
        <option>Daily exercise or intense exercise 3-4 times/week</option>
        <option>Intense exercise 6-7 times/week</option>
        <option>Very intense exercise daily, or physical job</option>
      </select>
    </div>

    <div class="col-md-4">
      <label for="gender" class="form-label">Gender</label>
      <select id="gender" name="gender" class="form-select">
        <option selected>Choose...</option>
        <option>Male</option>
        <option>Female</option>
      </select>
    </div>
    

    <div class="col-12">
      <button type="submit" class="btn btn-primary" @click=${model['clickHandler']}>Calculate</button>
    </div>

    <div id='result-div' style="margin-top: 100px; text-align: center;">
        <h3 id='result'></h3>
    </div>
    </section>
`

let context = undefined;


function calculateCalorieIntake(weight, height, age,  activity, gender) {
    if (gender == 'Male') {
        let bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        return bmr; 
    } else {
        let bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);  
        return bmr;
    }
    

}

function clickHandler() {
    let weightInputElement = document.querySelector('#weight');
    let heightInputElement = document.querySelector('#height');
    let ageInputElement = document.querySelector('#age');
    let activityInputElement = document.querySelector('#activity');
    let genderInputElement = document.querySelector('#gender');

    let bmr = calculateCalorieIntake(weightInputElement.value, heightInputElement.value, ageInputElement.value, undefined, genderInputElement.value);

    let resultElement = document.querySelector('#result');
    resultElement.textContent = `Your daily calorie intake must be: ${bmr}kcal`;

    weightInputElement.value = '';
    heightInputElement.value = '';
    ageInputElement.value = '';
    activityInputElement.value = '';
    genderInputElement.value = '';
}


function viewPage(cntxt) {
    context = cntxt;
    let viewModel = {
        clickHandler,
    }

    let templateResult = calorieIntakeCalculatorTemplate(viewModel);
    context.renderView(templateResult);

}

export default {
    viewPage,
}