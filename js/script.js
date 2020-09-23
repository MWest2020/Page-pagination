/***
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
***/

//Use strict when coding from scratch to catch errors
//"use strict"

/* 
Variables to store NodeList of DOM elements
*/
    //node for dynamically inserting the selection of student profiles
let studentList = document.querySelector('ul.student-list');
    // node for dynamically inserting the desired page of student profiles.
const addPage = document.querySelector('ul.link-list');
   // node for dynamically inserting the search bar.
const searchBarNode = document.querySelector('.header');
    
let studentItem;
    //Node for the HTML to show student items or no result.







searchForm();

const search = document.querySelector('#search');
const submit = document.querySelector('#submit');
//passes the students' array to the dataJS variable.
let dataJS = data;
//sets the amount of students displayed on the page.
const perPage = 9;
//sets the nth page on loading
const page = 1;
//empty sting to be replaced with the search.value
let searchString = "";
//array to store search results in
let filteredList = [];

   //variable to keep track of the total amount of pages needed.
   let totalPage = Math.ceil(dataJS.length / 9);



/***
 showPage function that needs 2 parameters: the 1 page we will see. The other is the object literal from which we retrieve the student profile's.
***/

 function showPage(page, data){
    //variables to determine the range of students items. e.g. 1(first page) * 9 (items per page) = 9 MINUS the items per page equals 0. Other pages will result in 9, 18, 27 and so on. These integers correspond to the first items that would want to see on page 1, 2, 3 etc. The endPage formula corresponds to the last items we want to see (8, 17, 26 and so on). 
   const startPage = (page * perPage) - perPage;
   const endPage = page * perPage - 1;

    //clear the element each time to prevent unwanted content.
    studentList.innerHTML = "";
   
    //for loop that needs first parameter to display a section of student items. 
    for (let i = 0; i < dataJS.length; i++) {
        // filters the exact positions from the database
      if(i >= startPage && i <= endPage){ 
        //node created for student template and adding classes to the node.
        studentItem = document.createElement('li');
        studentItem.classList.add('student-item', 'cf');
        

            // student item template:
        studentItem.innerHTML = 
            `
            <div class="student-details">
                    <img class="avatar" 
                    src="${data[i].picture.large}" 
                    alt="Profile Picture">
                <h3>${data[i].name.first} ${data[i].name.last}</h3>
                <span class="email">${data[i].email}</span>
            </div>
            <div class="joined-details">
                <span class="date">Joined ${data[i].registered.date}</span>
            </div>
            `
            studentList.appendChild(studentItem);
      }
    }
}



/***
 addPagination function that needs 3 parameters: the same as the showPage function, but this one also needs the total pages (stored in totalPage)
***/

function addPagination(page, totalPage, data) {
    //Reset HTML every time a button is clicked, otherwise we get 5 buttons everytime we change pages.
    addPage.innerHTML = "";
        //Starting from 1, since a page 0 doesn't make sense
    for (let i = 0; i < totalPage; i++) {
            //create the LI elements and buttons with page numbers 
        let LI = document.createElement('li');
        LI.innerHTML = `<button>${i + 1}</button>`;

            //Get button element to add the Event Listener 
        let button = LI.firstElementChild;

            //Event Listener for the clicking the button's behaviour.
        button.addEventListener('click', () => {
            
            //Use the inner HTML of the button to pass which button is being clicked to the functions
            showPage(Number(button.textContent), data);
            addPagination(Number(button.textContent), totalPage, data);
            })
        
            //Set the "active" class to the first button.  Not happy with this as it doesn't cover loading the page on a different page. Needs work
        if (i + 1  === page) {
            button.classList.add('active');
        }
        
        //Append the button element to the ul
        addPage.appendChild(LI);
      }
   }

showPage(page, data);
addPagination(page, totalPage, data);

/*** Event listeners for buttons - Invoke your search function in the body of the callbacks in the event listeners below. If the user submits or types in a student's first or last name, the event listeners will handles the logic and invoke the studentSearch function.
 ***/

submit.addEventListener('click', studentSearch);
search.addEventListener('keyup', studentSearch); 
    

/***
 studentSearch function. This function requires a search input. The keyup event takes care of it. As keys are released, and as long as the input is an actual input, the items corresponding tot the input are pushed in the filteredList array. The items in the array are counted and divided by the items per page and altPageButtons will determine how many buttons will be dynamically added. If no search results correspond, the message no results are found will show up and the button html will be replaced with an empty string.
***/

function studentSearch() {
   const searchString = search.value.toUpperCase();
   let filteredList = [];
   let altPageButtons; 

    if(!searchString.length == 0){

        dataJS = filteredList;
        for (let i = 0; i < data.length; i ++) {
       
            if (data[i]['name']['first'].toUpperCase().includes(searchString) || data[i]['name']['last'].toUpperCase().includes(searchString) ) {
            filteredList.push(data[i]);
            //this variable stores the correct amount of student items to display and calculates the amount of buttons needed
            altPageButtons = Math.ceil(filteredList.length / 9);
            //
            showPage(1, filteredList);
            addPagination(1, altPageButtons, filteredList);
            
            } else {
                studentList.innerHTML = `No results found. Please Try again`;
                addPage.innerHTML = "";
            }
        }
    }
}
  
//Simple function to create a search bar
function searchForm() {
   
    searchBarNode.innerHTML = 
                `
                <h2>Students</h2>
                <label for="search" class="student-search">
                <input id="search" placeholder="Search by name...">
                <button type="submit" id="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
                </label>
                `
}