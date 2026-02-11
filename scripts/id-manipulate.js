

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



function EventListener(){ // gets data from input
   
   const btn=document.querySelector('.btn-js');
   const inputElement =document.querySelector('.input-js');

   btn.addEventListener('click',()=>{
     processData();
     generateHTML();
   });

   inputElement.addEventListener('keydown', (event) => {
     if(event.key==='Enter'){
       processData();
       generateHTML();
     }
   });
   
   // EVENT DELEGATION - This works for dynamically added buttons
   document.addEventListener('click', async (e) => {
     const downloadBtn = e.target.closest('#download-btn');
     if (downloadBtn) {
       e.preventDefault();
       await generateCertificate();
     }
   });
}

generateHTML();

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




        
          function generateHTML(){

            


            let card=document.querySelector('.card-js');

            const currentInput = document.querySelector('.input-js')?.value || '';

            if(data.validation==='VALID'){

                card.innerHTML=`<div class="card card-js">
                <h2 class="card-title"><i class="fas fa-user-check"></i> Identity Verification</h2>
                <div class="input-group">
                    <label for="id-number">Enter ID Number</label>
                    <div class="input-with-icon">
                        <i class="fas fa-id-badge"></i>
                        <input type="text" id="id-number" placeholder="8501015263083" maxlength="13" class="input-js" value="${currentInput}">
                    </div>
                    <p class="hint">Enter 13-digit South African ID (no spaces)</p>
                </div>
                
                <button id="verify-btn" class="btn  btn-js">
                    <i class="fas fa-shield-alt"></i> Verify Identity
                </button>
                
                <div class="loader" id="loader"></div>


                
                <button id="download-btn" class="downloadBtn btn-js">
                <i class="fas fa-download"></i> Download Verification Certificate
                </button>
            </div>`

            EventListener();

            }
             
            else{


              card.innerHTML= `<div class="card card-js">
                <h2 class="card-title"><i class="fas fa-user-check"></i> Identity Verification</h2>
                <div class="input-group">
                    <label for="id-number">Enter ID Number</label>
                    <div class="input-with-icon">
                        <i class="fas fa-id-badge"></i>
                        <input type="text" id="id-number" placeholder="8501015263083" maxlength="13" class="input-js" value="${currentInput}">
                    </div>
                    <p class="hint">Enter 13-digit South African ID (no spaces)</p>
                </div>
                
                <button id="verify-btn" class="btn  btn-js">
                    <i class="fas fa-shield-alt"></i> Verify Identity
                </button>
                
                <div class="loader" id="loader"></div>
            </div>`

               EventListener();
            }

            
            
}


async function generateCertificate() {

    // Check if PDFLib is loaded
    if (typeof PDFLib === 'undefined') {
        alert('PDF library not loaded. Please check your internet connection and refresh the page.');
        console.error('PDFLib is not defined. Make sure the script is loaded.');
        return;
    } 

    // Only generate if validation is VALID
    if (data.validation !== 'VALID') {
        alert('Cannot generate certificate: Invalid ID number');
        return;
    }

    try {
        // Show loading state on button
        const downloadBtn = document.querySelector('#download-btn');
        if (!downloadBtn) {
            console.error('Download button not found');
            return;
        }

        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Certificate...';
        downloadBtn.disabled = true;

        // Create a new PDF document
        const { PDFDocument, rgb, StandardFonts } = PDFLib;
        const pdfDoc = await PDFDocument.create();

        // Add a page (increased height for better spacing)
        const page = pdfDoc.addPage([600, 450]);

        // Embed fonts
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // ============ FORMAL CERTIFICATE FRAME ============
        // Outer border
        page.drawRectangle({
            x: 25,
            y: 25,
            width: 550,
            height: 400,
            borderColor: rgb(0.2, 0.3, 0.6),
            borderWidth: 1.5,
            color: rgb(1, 1, 1)
        });

        // Inner decorative border
        page.drawRectangle({
            x: 30,
            y: 30,
            width: 540,
            height: 390,
            borderColor: rgb(0.8, 0.8, 0.8),
            borderWidth: 0.5,
            color: rgb(1, 1, 1)
        });

        // Header separator
        page.drawLine({
            start: { x: 50, y: 380 },
            end: { x: 550, y: 380 },
            thickness: 0.5,
            color: rgb(0.6, 0.6, 0.6)
        });

        // ============ HEADER SECTION ============
        // Main Title
        page.drawText('REPUBLIC OF SOUTH AFRICA', {
            x: 170,
            y: 407,
            size: 14,
            font: helveticaBold,
            color: rgb(0.2, 0.3, 0.6)
        });

        // Certificate Title
        page.drawText('VERIFICATION CERTIFICATE', {
            x: 160,
            y: 385,
            size: 20,
            font: helveticaBold,
            color: rgb(0, 0, 0)
        });

        // Subtitle
        page.drawText('Identity Document Validation', {
            x: 210,
            y: 365,
            size: 12,
            font: helvetica,
            color: rgb(0.4, 0.4, 0.4)
        });

        // ============ CONTENT SECTION ============
        // Certification statement
        page.drawText('This is to certify that the following identity document', {
            x: 150,
            y: 320,
            size: 11,
            font: helvetica,
            color: rgb(0.2, 0.2, 0.2)
        });

        page.drawText('has been verified through the official verification system:', {
            x: 140,
            y: 300,
            size: 11,
            font: helvetica,
            color: rgb(0.2, 0.2, 0.2)
        });

        // ID Number (prominently displayed)
        page.drawText(input, {
            x: 200,
            y: 260,
            size: 18,
            font: helveticaBold,
            color: rgb(0, 0, 0.6)
        });

        // ============ DETAILS CARD ============
        // Background for details
        page.drawRectangle({
            x: 80,
            y: 137,
            width: 240,
            height: 100,
            borderColor: rgb(0.9, 0.9, 0.9),
            borderWidth: 0.5,
            color: rgb(0.98, 0.98, 0.98)
        });

        // Details Header
        page.drawText('IDENTITY DETAILS', {
            x: 100,
            y: 225,
            size: 10,
            font: helveticaBold,
            color: rgb(0.4, 0.4, 0.4)
        });

        // Status
        page.drawText('Verification Status:', {
            x: 100,
            y: 200,
            size: 10,
            font: helvetica,
            color: rgb(0.4, 0.4, 0.4)
        });

        const statusColor = rgb(0, 0.5, 0);
        page.drawText(`${data.validation}`, {
            x: 200,
            y: 200,
            size: 10,
            font: helveticaBold,
            color: statusColor
        });

        // Date of Birth
        page.drawText('Date of Birth:', {
            x: 100,
            y: 180,
            size: 10,
            font: helvetica,
            color: rgb(0.4, 0.4, 0.4)
        });

        page.drawText(`${data.birthday}`, {
            x: 200,
            y: 180,
            size: 10,
            font: helvetica,
            color: rgb(0, 0, 0)
        });

        // Gender
        page.drawText('Gender:', {
            x: 100,
            y: 160,
            size: 10,
            font: helvetica,
            color: rgb(0.4, 0.4, 0.4)
        });

        page.drawText(`${data.gender}`, {
            x: 200,
            y: 160,
            size: 10,
            font: helvetica,
            color: rgb(0, 0, 0)
        });

        // Age
        page.drawText('Age:', {
            x: 100,
            y: 140,
            size: 10,
            font: helvetica,
            color: rgb(0.4, 0.4, 0.4)
        });

        page.drawText(`${data.age} years`, {
            x: 200,
            y: 140,
            size: 10,
            font: helvetica,
            color: rgb(0, 0, 0)
        });

        // ============ STAR SIGN SECTION ============
        page.drawText('Star Sign:', {
            x: 350,
            y: 200,
            size: 10,
            font: helvetica,
            color: rgb(0.4, 0.4, 0.4)
        });

        page.drawText(`${data.starSign}`, {
            x: 410,
            y: 200,
            size: 10,
            font: helveticaBold,
            color: rgb(0.6, 0.4, 0.1)
        });

        // ============ OFFICIAL STAMP SECTION ============
        // Positioned in top-right corner, away from footer
        if (data.validation === 'VALID') {
            // Official seal circle
            page.drawCircle({
                x: 500,
                y: 310,
                size: 45,
                borderWidth: 2,
                borderColor: rgb(0, 0.4, 0),
                color: rgb(1, 1, 1)
            });

            // Inner circle for seal effect
            page.drawCircle({
                x: 500,
                y: 310,
                size: 42,
                borderWidth: 0.5,
                borderColor: rgb(0.8, 0.8, 0.8),
                color: rgb(1, 1, 1)
            });

            // APPROVED text
            page.drawText('APPROVED', {
                x: 470,
                y: 315,
                size: 12,
                font: helveticaBold,
                color: rgb(0, 0.4, 0)
            });

            // Official stamp text
            page.drawText('OFFICIAL', {
                x: 476,
                y: 300,
                size: 8,
                font: helvetica,
                color: rgb(0.4, 0.4, 0.4)
            });

            // VERIFIED stamp
            page.drawText('VERIFIED', {
                x: 475,
                y: 280,
                size: 10,
                font: helveticaBold,
                color: rgb(0, 0.5, 0)
            });
        }

        // ============ OFFICIAL SIGNATURE SECTION ============
        page.drawLine({
            start: { x: 80, y: 100 },
            end: { x: 220, y: 100 },
            thickness: 0.5,
            color: rgb(0.2, 0.2, 0.2)
        });

        page.drawText('Authorised Signature', {
            x: 100,
            y: 85,
            size: 8,
            font: helvetica,
            color: rgb(0.4, 0.4, 0.4)
        });

        // ============ FOOTER SECTION ============
        // Generation date
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-ZA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        page.drawText(`Certificate Generated: ${dateStr}`, {
            x: 50,
            y: 55,
            size: 9,
            font: helvetica,
            color: rgb(0.5, 0.5, 0.5)
        });

        // Reference number
        const refNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
        page.drawText(`Ref: ZA-${refNumber}`, {
            x: 50,
            y: 40,
            size: 8,
            font: helvetica,
            color: rgb(0.5, 0.5, 0.5)
        });

        // System name - repositioned to left side
        page.drawText('South African ID Verification System', {
            x: 350,
            y: 55,
            size: 9,
            font: helveticaBold,
            color: rgb(0.2, 0.3, 0.6)
        });

        // Page number/version
        page.drawText('v1.0 • Official Document', {
            x: 350,
            y: 40,
            size: 8,
            font: helvetica,
            color: rgb(0.5, 0.5, 0.5)
        });

        // Save the PDF
        const pdfBytes = await pdfDoc.save();

        // Create download link
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `SA-ID-Verification-${data.birthday || 'certificate'}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(url);

        // Restore button
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;

        console.log('Formal certificate generated and downloaded successfully!');

    } catch (error) {
        console.error('Error generating certificate:', error);
        alert('Error generating certificate: ' + error.message);

        // Restore button
        const downloadBtn = document.querySelector('#download-btn');
        if (downloadBtn) {
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Verification Certificate';
            downloadBtn.disabled = false;
        }
    }
}
