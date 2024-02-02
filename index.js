const form = document.getElementById("form"); 
const input  = document.getElementById("input"); 
const textarea= document.getElementById("textarea"); 

const root = document.getElementById("root");

const mainContainer = document.getElementById("main-container");

const getData = JSON.parse(localStorage.getItem("array"));

let array = [];

if(getData){

  array = [...getData];
 

}
// console.log(getData);







function hello(event){

  event.preventDefault();


  // console.log(input.value );
  // console.log( textarea.value);

  if(input.value !== "" && textarea.value !==""){

    let obj = {"title": input.value, "description": textarea.value}

    array.push(obj);

    createToDo(input.value, textarea.value);

    console.log(array);
    localStorage.setItem("array", JSON.stringify(array));
  }

  else{

    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Please fill title or description";
    form.appendChild(errorMessage);
    
    
  }
 

  input.value = "";
  textarea.value = "";
}



function createToDo (titleV, descriptionV ){

  const container = document.createElement("div");
  const title = document.createElement("h1");
  const description= document.createElement("p");
  const deleteButton = document.createElement("button");
  const updateButton = document.createElement("button");

  container.setAttribute("class", "todo-item"); 

  title.textContent = titleV;
  description.textContent = descriptionV;
  deleteButton.textContent = "delete";
  updateButton.textContent = "update";

  container.appendChild(title);
  container.appendChild(description); 
  container.appendChild(deleteButton);
  container.appendChild(updateButton);

  root.appendChild(container);



  deleteButton.addEventListener("click", function deleteContainer(){
      root.removeChild(container);

      
     
      const index = array.findIndex((obj) => obj.title === titleV && obj.description === descriptionV) ; 

      if(index !== -1){

        array.splice(index,1);
        localStorage.removeItem("array");

        array = [...array]

        localStorage.setItem("array", JSON.stringify(array));



      }

      
      

  })



  updateButton.addEventListener("click", function updateToDoItem(){


    deleteButton.disabled = true;
    updateButton.disabled = true;

    const modalCover  = document.createElement("div"); 
    const modal = document.createElement("div"); 

    const modalInput = document.createElement("input"); 
    const modalTextarea = document.createElement("textarea"); 
    const modalSaveButton = document.createElement("button");


    modalCover.setAttribute("class", "modalcover");
    modal.setAttribute("class", "modal"); 

    modalInput.value = titleV;
    modalTextarea.textContent = descriptionV;

    modalSaveButton.textContent = "Save";


    
    modal.appendChild(modalInput)
    modal.appendChild(modalTextarea )
    modal.appendChild(modalSaveButton)
    modalCover.appendChild(modal )

   mainContainer.appendChild(modalCover);


   modalSaveButton.addEventListener("click", function saveToDoItem(){

const index = array.findIndex((obj) => obj.title === titleV && obj.description === descriptionV) ; 

      if(index !== -1){

        array.splice(index,1);
        localStorage.removeItem("array");

        array = [...array,{"title": modalInput.value, "description": modalTextarea.value}]

        localStorage.setItem("array", JSON.stringify(array));

        root.textContent = "";

        defa()

        mainContainer.removeChild(modalCover);

      }
    

    
   })




  })




}


function defa (){


  

  if (array.length >0 ){


    for(let i=0 ; i <array.length ; i++){


      const arTitle = array[i].title ; 

      const arDescription = array[i].description;

      createToDo(arTitle, arDescription)


    }
  }


}


defa();