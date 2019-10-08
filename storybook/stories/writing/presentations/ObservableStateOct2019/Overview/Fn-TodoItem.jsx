function TodoItem({ todo }) {
  return (
    <div>
      {todo.title} {todo.done && "✅"}
    </div>
  );
}
// Used as
<TodoItem todo={{ title: "Get milk", done: true }}/>
