import React, { useEffect, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";

interface TodoListProps {}

export const TodoList: React.FC<TodoListProps> = ({}) => {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("http://localhost:4001/api/v1/todos");
        const jsonData = await response.json();
        setTodos(jsonData.data.todos);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleDelete = async (e: any, id: number) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:4001/api/v1/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(
        todos.filter((todo: any) => {
          return todo.id !== id;
        })
      );
    } catch (err) {}
  };

  return (
    <div className="md:px-32 py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white text-center">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-m text-center">
                Task
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-m text-center">
                Edit
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-m text-center">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {todos &&
              todos.map((todo: any) => {
                return (
                  <tr key={todo.id}>
                    <td className="px-4">{todo.todo}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="border border-yello-500 bg-yellow-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                      >
                        Update
                      </button>{" "}
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                        onClick={(e) => handleDelete(e, todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
