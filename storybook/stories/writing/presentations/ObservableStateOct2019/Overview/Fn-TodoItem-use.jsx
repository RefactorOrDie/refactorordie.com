import React from "react";

function TodoItem({ todo }) {
  return (
    <div>
      {todo.title} {todo.done && "✅"}
    </div>
  );
}

// Used as
export const TODO_ITEM_EXAMPLE = (
  <TodoItem todo={{ title: "Get milk", done: true }} />
);
