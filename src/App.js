import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TodoContainer from "./components/TodoContainer";
import "./App.css";

function App() {
  const [arr, setArr] = useState([]);

  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const array = [...arr, { goal: goal, description: description }];

    setArr([...arr, { goal: goal, description: description }]);

    setDescription("");
    setGoal("");

    localStorage.setItem("array", JSON.stringify(array));

    toast.success("Todo is Created");
  };

  const handleClick = (objDelete) => {
    localStorage.removeItem("array");

    // console.log(objDelete);

    const index = arr.findIndex(
      (obj) =>
        obj.goal === objDelete.goalText &&
        obj.description === objDelete.descriptionText
    );

    arr.splice(index, 1);
    setArr([...arr]);

    localStorage.setItem("array", JSON.stringify([...arr]));
  };

  useEffect(() => {
    const def = () => {
      const localArray = JSON.parse(localStorage.getItem("array"));

      if (localArray) {
        setArr([...localArray]);
      }
    };

    def();
  }, []);

  return (
    <div className="main-container">
      <ToastContainer
        
      />

      <div className="form-container-box">
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            placeholder="Enter your Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <textarea
            placeholder="Describe it ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="goals-container">
        {arr.length > 0 &&
          arr.map((obj) => (
            <TodoContainer
              goalText={obj.goal}
              descriptionText={obj.description}
              key={obj.goal}
              handleClick={handleClick}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
