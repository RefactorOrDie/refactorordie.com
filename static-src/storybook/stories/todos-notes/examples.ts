interface TodoActionDispatcher {
  changeNewTodoLabel(label: string): void;
  addNewTodo(): void;
  deleteTodo(todo_id: string): void;
	toggleTodo(todo_id: string): void;
}
