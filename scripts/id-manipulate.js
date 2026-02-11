

let input=""
let idNumber=[];
const century={
oldCentury:'19',
newCentury:'20'

};
let data={

year:'',
month:'',
day:'',
gender:'',
starSign:'',
age:'',
validation:'',
birthday:''

};



function EnterEventListener(){ // gets data from input
   
   const btn=document.querySelector('.btn-js');
   const inputElement =document.querySelector('.input-js');

   btn.addEventListener('click',()=>{

     processData();

   });

  inputElement.addEventListener('keydown', (event) => {
  if(event.key==='Enter'){
    processData();

  }
    
  });

  
  
  
}

function processData(){

  
  const btn=document.querySelector('.btn-js'); // calling a button
  const inputElement =document.querySelector('.input-js'); // getting inputbox data

 

   input=inputElement.value;

  idNumber=input.split('').map(Number);

     extractData();
     
     console.log(`date of birth is :'${data.year}/${data.month}/${data.day} and is a : ${data.gender}`);

     data.starSign=getZodiacByMonth(Number(data.month), Number(data.day));

     data.age=getAge();
     validateId(idNumber);
     getSum();

     data.validation=determineValidation();
     displayData();



     console.log();
     

    console.log(data);

    console.log(validateId(idNumber))

    console.log(`sum is ${getSum()}` )

    
     
  
     
  

}





function extractData(){

let currentYear=new Date().getFullYear();


  
  if(idNumber[0] === 0){  // First digit is 0 for 2000s
    data.year = Number('20' + `${idNumber[0]}` + `${idNumber[1]}`);
  } else {
    data.year = Number('19' + `${idNumber[0]}` + `${idNumber[1]}`);
  }



  if(idNumber[6]<=4){
   
    data.gender='Female'

  }
  else{

     data.gender='Male'
  }

  data.month=Number(`${idNumber[2]}`+`${idNumber[3]}`).toString().padStart(2, '0');
  data.day=Number(`${idNumber[4]}`+`${idNumber[5]}`).toString().padStart(2, '0');

 data.birthday=`${data.year}/${data.month}/${data.day}`





}

function getZodiacByMonth(month, day) {
  
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";

    return "Capricorn"; // Dec 22 - Jan 19

}



function getAge(){

let age;

const yearBorn=Number(data.year);

  const currentYear = new Date().getFullYear();

  console.log(typeof(yearBorn));

  age=currentYear-yearBorn;

return age;


}



function validateId(id) {
  let luhn = [];
  
  // Create a copy and reverse it to process from right to left
  let reversedId = [...id].reverse();
  
  reversedId.forEach((element, index) => {
    if (index % 2 === 1) { // Odd positions in reversed array (even in original)
      let tempsave = element * 2;
      
      if (tempsave >= 10) {
        let digits = String(tempsave).split('').map(Number);
        luhn.push(digits[0] + digits[1]);
      } else {
        luhn.push(tempsave);
      }
    } else { // Even positions in reversed array (odd in original)
      luhn.push(element);
    }
  });
  
  // The luhn array is in reversed order, so we need to reverse it back
  // Actually, for sum calculation we don't need to reverse it back
  return luhn;
}


function getSum(){

  let sum=0;
validateId(idNumber).forEach(element => {

  sum+=element;


  
});


return sum;


}

function determineValidation(){
  const input = document.querySelector('.input-js').value;
  const sum = getSum();
  
  // Check length first
  if(input.length !== 13){
    resetData();
    return 'INVALID';
  }
  
  // Check Luhn algorithm
  if(sum % 10 === 0){
    return 'VALID';
  } else {
    resetData();
    return 'INVALID';
  }
}

function resetData(){
  data.year = 'NONE';
  data.month = 'NONE';
  data.day = 'NONE';
  data.gender = 'NONE';
  data.starSign = 'NONE';
  data.age = 'NONE';
  data.birthday = 'NONE';
}

function displayData(){

    const validationElement = document.querySelector('.validation-js');

    validationElement.innerHTML=data.validation;
   
    // Set color based on validation status
    if(data.validation === 'VALID') {
        validationElement.style.color = 'green';
        validationElement.style.fontWeight = 'bold';
    } else if(data.validation === 'INVALID') {
        validationElement.style.color = 'red';
        validationElement.style.fontWeight = 'bold';
    } else {
        validationElement.style.color = ''; // Reset to default
        validationElement.style.fontWeight = '';
    }


    
    const starSignElement=document.querySelector('.star-sign-js'); 
    starSignElement.innerHTML = data.starSign; 

   
    if (data.starSign==='NONE') {

      starSignElement.style.color='black';
    }
     else if(data.starSign !=='NONE'){
    
      starSignElement.style.color='goldenrod';

    }

    else{

      starSignElement.color='';
    }





    const ageElement =document.querySelector('.age-js');
    ageElement.innerHTML = data.age;   

    if(data.age==='NONE')
    {
    
      ageElement.style.color="black"

    }
    else if(data.age !=='NONE'){
   
     ageElement.style.color="#2d906d"
    }
    else{
      ageElement.style.color=""
    }

    
    const birthdayElement=document.querySelector('.birthday-js');
    
    birthdayElement.innerHTML=data.birthday;

    if(data.birthday==='NONE'){

      birthdayElement.style.color="black";

    }
    else if(birthdayElement!=='NONE'){
     
      birthdayElement.style.color="#8f1587";
    }

   else{
    birthdayElement.style.color="";
   }


   const genderElement=document.querySelector('.gender-js');

    genderElement.innerHTML=data.gender;

    if(data.gender==='NONE'){

    genderElement.style.color='black';

    }
    else if(data.gender!=='NONE'){

      genderElement.style.color='#ff8411';
    }
    else{

      genderElement.style.color='';
    }
}



EnterEventListener();
