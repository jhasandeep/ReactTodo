import {useState} from "react"

const TodoContainer = ({goalText, descriptionText, handleClick}) =>{

    const [isUpdate, setUpdate] = useState(false);
  
    const [goalTodo, setGoalTodo] = useState(goalText);
    
    const [descriptionTodo, setDescriptionTodo] = useState(descriptionText);
  
  
  
    
  
    const handleClickDelete = () => {
  
      handleClick({"goalText": goalText, "descriptionText" : descriptionText})
  
     
    }
  
    const handleUpdate = () =>{
  
      setUpdate(!isUpdate);
      
  
    }
  
    const handleSave = () => {
  
  
      
  
      setUpdate(!isUpdate);
    
    }
  
    return(isUpdate ?   (
  
  <div className="todo-element">
  
  <input type="text" value={goalTodo}  onChange={(e) => setGoalTodo(e.target.value)}/>
  <textarea  value={descriptionTodo} onChange={(e) => setDescriptionTodo(e.target.value)}></textarea>
  <button onClick={handleSave}>save</button>
  
  </div>) :(<div className="todo-element">
  
  <h1>{goalTodo}</h1>
  <p>{descriptionTodo}</p>
  <button onClick={handleClickDelete}>Delete</button>
  <button onClick={handleUpdate}> Update</button>
  </div>)
  
      
    )
  }


  export default TodoContainer