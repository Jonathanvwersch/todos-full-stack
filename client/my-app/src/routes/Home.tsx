import React from "react";
import { AddTodo } from "../components/AddTodo";
import { TodoList } from "../components/TodoList";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div className="flex-col w-full">
      <h1 className="text-4xl mt-4 text-center ">Tasks for the day</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};
