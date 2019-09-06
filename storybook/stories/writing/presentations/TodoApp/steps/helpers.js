/**
 * @param {string?} title
 * @param {boolean?} done
 * @returns {Todo}
 */
export function createTodo(title = "Untitled Todo", done = false) {
  return {
    id: Math.random(),
    title,
    done
  };
}
