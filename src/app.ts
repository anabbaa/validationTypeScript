const config: { [input: string]: string[] } = {};
 
const addValidator = (input: string, type: string) => {
  config[input] = config[input] 
    ? [...config[input], type] 
    : [type];
}
 
const Required = (_: any, input: string) => addValidator(input, 'required');
const Maxlength = (_: any, input: string) => addValidator(input, 'maxlength');
const Positive = (_: any, input: string) => addValidator(input, 'positive');
 
const validate = (course: any) =>  
  Object.entries(config).every(([input, types]) => 
    types.every(type => 
      type === 'required' && course[input] || 
      type === 'positive' && course[input] > 0 ||
      type === 'maxlength' && course[input].length < 5
    )
  )

class Course {

    @Required @Maxlength title: string;
    @Positive @Required  price: number;
 
  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
 
}

const courseform = document.querySelector("form")!;

courseform.addEventListener("submit", event =>{
const titleEL = document.getElementById("title") as HTMLInputElement;
const priceEl = document.getElementById("price") as HTMLInputElement;

const titleV = titleEL.value;
const priceV = parseInt(priceEl.value);
    event.preventDefault();
    const course1 = new Course(titleV, priceV);

    if (!validate(course1)) {
             alert('Invalid input, please try again!');
             return;
           }
    console.log(course1);
 })