import React from "react";
import { UpdateTodo } from "../components/UpdateTodo";

interface UpdateTodosProps {}

export const UpdateTodos: React.FC<UpdateTodosProps> = ({}) => {
  return (
    <div className="w-full">
      <h1 className="text-4xl mt-4 text-center ">Update Todo</h1>
      <UpdateTodo />
    </div>
  );
};
