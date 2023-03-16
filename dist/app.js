"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const config = {};
const addValidator = (input, type) => {
    config[input] = config[input]
        ? [...config[input], type]
        : [type];
};
const Required = (_, input) => addValidator(input, 'required');
const Maxlength = (_, input) => addValidator(input, 'maxlength');
const Positive = (_, input) => addValidator(input, 'positive');
const validate = (course) => Object.entries(config).every(([input, types]) => types.every(type => type === 'required' && course[input] ||
    type === 'positive' && course[input] > 0 ||
    type === 'maxlength' && course[input].length < 5));
class Course {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    Required,
    Maxlength
], Course.prototype, "title", void 0);
__decorate([
    Positive,
    Required
], Course.prototype, "price", void 0);
const courseform = document.querySelector("form");
courseform.addEventListener("submit", event => {
    const titleEL = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const titleV = titleEL.value;
    const priceV = parseInt(priceEl.value);
    event.preventDefault();
    const course1 = new Course(titleV, priceV);
    if (!validate(course1)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(course1);
});
