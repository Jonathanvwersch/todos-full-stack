import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TodosContext } from "../contexts/TodosContext";

interface AddTodoProps {}

export const AddTodo: React.FC<AddTodoProps> = ({}) => {
  const [description, setDescription] = useState("");
  const { addTodos } = useContext(TodosContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4001/api/v1/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: description,
        }),
      });
      const jsonData = await response.json();
      addTodos(jsonData.data.todo);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="md:px-32 py-8 w-full">
      <form className="w-full flex justify-between">
        <label htmlFor="todo" className=""></label>
        <input
          id="todo"
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="flex-1 appearance-none rounded shadow p-3 text-grey-dark mr-2 focus:outline-none"
          placeholder="What needs to get done today"
        />
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
      </form>
    </div>
  );
};
