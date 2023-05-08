import { useState } from "react";

export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    const len = todoList.length;
    const lastId = len === 0 ? 0 : todoList[len - 1].id;

    const newTodoList = [
      ...todoList,
      {
        id: ++lastId, content: input, date: selectedDate, isSuccess: false,
      }
    ];
    setTodoList(newTodoList);
  };

  const removeTodo = todoId => {
    const newTodoList = todoList.filter(({ id })  => id !== todoId);
    setTodoList(newTodoList);
  };

  const toggleTodo = todoId => {
    const newTodoList = todoList.map((todo) => {
      if(todo.id !== todoId) return todo;
      return {
        ...todo,
        isSuccess: !todo.isSuccess
      }
    });
    setTodoList(newTodoList);
  };

  return {};
};