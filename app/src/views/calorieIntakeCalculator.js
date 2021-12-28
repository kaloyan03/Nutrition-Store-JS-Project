import { html } from '../lib.js';

const calorieIntakeCalculatorTemplate = (model) => html`
    <section class='calorie-intake-page' style="max-width:1100px; margin:80px auto;">
    <h2 style='text-align: center;'>BMR Calculator(Daily Calorie Intake)</h2>
  <form class="row g-3">
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
        <option dataset-type="sedentary">Sedentary: little or no exercise</option>
        <option dataset-type="lightlyActive">Exercise 1-3 times/week</option>
        <option dataset-type="moderatelyActive">Exercise 4-5 times/week</option>
        <option dataset-type="veryActive">Intense exercise 6-7 times/week</option>
        <option dataset-type="extraActive">Very intense exercise daily, or physical job</option>
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
  <form class="row g-3">

    </section>
`

let context = undefined;


function calculateCalorieIntake(weight, height, age,  activity, gender) {
    const activityMultiplierMapper = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9,
    }
  
    if (gender == 'Male') {
        let bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        let calorieIntake = bmr * activityMultiplierMapper[activity];
        return calorieIntake; 
    } else {
        let bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);  
        let calorieIntake = bmr * activityMultiplierMapper[activity];
        return calorieIntake;
    }
    

}

function clickHandler(e) {
    e.preventDefault();
    let weightInputElement = document.querySelector('#weight');
    let heightInputElement = document.querySelector('#height');
    let ageInputElement = document.querySelector('#age');
    let activityInputElement = document.querySelector('#activity');
    let genderInputElement = document.querySelector('#gender');

    if (weightInputElement.value == '' || heightInputElement.value == '' || ageInputElement.value == '' || activityInputElement.value == '' || genderInputElement.value == '') {
      alert('All fields are required!');
      return;
    }

    if (isNaN(weightInputElement.value) || isNaN(heightInputElement.value) || isNaN(ageInputElement.value)) {
      alert('Weight, height and age must be numbers!');
      return;
    }

    let optionElement = Array.from(activityInputElement).filter((el) => el.value == activityInputElement.value)[0];
    let activity = optionElement.getAttribute('dataset-type');

    let calories = calculateCalorieIntake(weightInputElement.value, heightInputElement.value, ageInputElement.value, activity, genderInputElement.value);

    let resultElement = document.querySelector('#result');
    resultElement.textContent = `Your daily calorie intake must be between: ${Math.floor(calories)}kcal`;

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