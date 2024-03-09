// make all variable toacess all element of html

const inputSlider=document.querySelector('#myRange');
const lengthDisplay=document.querySelector('.password-length');
const passwordDisplay=document.querySelector('#password-display');
const indicator=document.querySelector('.strength-icon');
const copyButton=document.querySelector('.copy-btn');
const checkboxes= document.querySelectorAll('input[type="checkbox"]');
const upperCaseCheck=document.querySelector('#uppercase');
const lowerCaseCheck=document.querySelector('#lowercase');
const symbolsCheck=document.querySelector('#symbols');
const numbersCheck=document.querySelector('#numbers');
const generateButton=document.querySelector('.generate-password');




let password=''
let passwordLength=10;
let checkCount=0;

////function to handle slider

function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}
handleSlider()
///set indicator function for strength icon

function setIndicator(color){
       indicator.style.backgroundColor=color;
}
///function for generating a random ineger

function getRndInteger(min,max){
   return( Math.floor(Math.random()*(max-min))+min)
}
function generatenumber(){
    return( getRndInteger(0,9))
 }
 



//function ti generate uppercase

function generateUpperCase(){
    return(String.fromCharCode(getRndInteger(65,90)))
}


//function to generate lower case

function generateLowerCase(){
    return(String.fromCharCode(getRndInteger(97,122))) 
}

//function to generate symbol

function generateSymbol(){
    const symbols='!@#%^&*(){}[];:_+-|=<>/,.'
    return symbols[getRndInteger(0,symbols.length)]
}

///function toncalculate strength

const calStrength=(password)=>{
    let hasUpper=false;
    let hasLower=false;
    let hasSymbol=false;
    let hasNumber=false;

    for(let i=0; i<password.length; i++)
    {
        if(password[i]>'A' && password[i]<'Z'){
            hasUpper=true;
        } else if(password[i]>'a' && password[i]<'z'){
            hasLower=true;
        } else if(password[i]>'0' && password[i]<'9'){
            hasNumber=true;
        }  else {
            hasSymbol=true;
        }
    }
    if(hasUpper&&hasLower&&(hasNumber||hasSymbol)&&password.length>8)
    {
        setIndicator('#00FF00')
    }
    else if((hasUpper&&hasLower)||(hasNumber&&hasSymbol)&&password.length>6)
    {
        setIndicator('#FFFF00')
    }
    else{
        setIndicator('#FF0000')
    }
}


//function to copy the password from password disply

 function copyContent()
{
     navigator.clipboard.writeText(passwordDisplay.value);
    alert("copied")
}
///now we are adding an event listener on copy btn

copyButton.addEventListener('click',copyContent)


//now hansling the slider with password length
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value
    handleSlider()
})

//function to handle checkboxes count

function handleCheckBoxes(input){
    checkCount=0;
    for(let i=0;i<checkboxes.length;i++){
        if(checkboxes[i].checked){
            checkCount++
        }    
    }
}

generateButton.addEventListener('click',(e)=>{
    
    if(checkCount==0)
    alert("please check atleast one checkbox")
    // return;
    let password=''
    let func_array=[]

    if(upperCaseCheck.checked){
        func_array.push(generateUpperCase)
        password += generateUpperCase()

    }
    if(lowerCaseCheck.checked){
        func_array.push(generateLowerCase)
        password += generateLowerCase()
    }
    if(numbersCheck.checked){
        func_array.push(generatenumber)
        password += generatenumber()
    }
    if(symbolsCheck.checked){
        func_array.push(generateSymbol)
        password += generateSymbol()
    }
    
     for(let i=0;i<passwordLength-checkCount;i++){
         let randomIndex=getRndInteger(0,checkCount)
        
         password+=func_array[randomIndex]()
         
     }
passwordDisplay.value=password
calStrength(password)
})







 



