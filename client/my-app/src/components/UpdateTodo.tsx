import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TodosContext } from "../contexts/TodosContext";

interface UpdateTodoProps {}

export const UpdateTodo: React.FC<UpdateTodoProps> = ({}) => {
  const [description, setDescription] = useState("");
  const { id } = useParams<any>();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/v1/todos/${id}`
        );
        const jsonData = await response.json();
        setDescription(jsonData.data.todo.todo);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4001/api/v1/todos/${id}/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            todo: description,
          }),
        }
      );
      history.push("/");
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
        />
        <button
          type="submit"
          className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
    </div>
  );
};
