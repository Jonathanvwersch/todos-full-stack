import React, { useState, createContext } from "react";

export const TodosContext = createContext<{
  todos: any;
  setTodos: any;
  addTodos: (todo: any) => void;
  selectedTodo: any;
  setSelectedTodo: any;
}>({
  todos: [],
  setTodos: null,
  addTodos: () => null,
  selectedTodo: [],
  setSelectedTodo: null,
});

interface TodosContextsProps {
  children: any;
}

export const TodosContextProvider: React.FC<TodosContextsProps> = ({
  children,
}) => {
  const [todos, setTodos] = useState<any>([]);
  const [selectedTodo, setSelectedTodo] = useState<any>(null);

  const addTodos = (todo: any) => {
    setTodos([...todos, todo]);
  };
  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        addTodos,
        selectedTodo,
        setSelectedTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
