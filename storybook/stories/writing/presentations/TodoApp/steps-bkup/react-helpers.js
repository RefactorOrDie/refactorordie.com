/**
 * Helper for creating onChange listeners
 * 
 * Example:
 * ```jsx
 *  const [value, setValue] = useState('')
 * 
 *  return <input onChange={changeValue(setValue)} value={value}/>
 * ```
 * 
 * @param {(value: string) => any} handler
 * @returns {(evt: React.ChangeEvent<HTMLFormElement | HTMLInputElement>) => void}
 */
export function changeValue(handler) {
  return evt => handler(evt.currentTarget.value);
}

/**
 * Helper for canceling default behaviors in functions
 * 
 * Example:
 * ```jsx
 *  return <form
 *    onSubmit={preventDefaultThen(() => console.log('prevented default submit'))}
 *  >
 *    ...
 *    <button>Submit</button>
 *  </form>
 * ```
 *
 * @param {() => void} handler
 * @returns {(evt: { preventDefault: Function }) => void}
 */
export function preventDefaultThen(handler) {
  return evt => {
    evt.preventDefault();
    handler();
  };
}

/**
 * Helper for responding to enter key and click events.
 * This produces a set of properties that you must spread.
 *
 * Props:
 *  * `tabIndex` for making the element tabbable
 *  * `onClick`
 *  * `onKeyDown` for detecting enter key pressed on the element
 *
 * Example:
 * ```jsx
 *   <li {...onEnterOrClick(() => console.log('activated Item 1'))}>Item 1</li>
 * ```
 *
 * @param {() => void} handler
 * @returns {React.HTMLAttributes<unknown>}
 */
export function onEnterOrClick(handler) {
  return {
    tabIndex: 0,
    onClick: evt => {
      evt.stopPropagation();
      handler();
    },
    onKeyDown: evt => {
      if (evt.key === "Enter") {
        evt.stopPropagation();
        if (
          !(
            evt.currentTarget instanceof HTMLButtonElement ||
            evt.currentTarget instanceof HTMLAnchorElement
          )
        ) {
          // onClick will handle this one
          handler();
        }
      }
    }
  };
}

/**
 * `console.warn` with [TODO] prefix
 * 
 * Example: `TODO("Finish the rest of the owl")`
 */
export const TODO = console.warn.bind(console, "%c[TODO]:", "color: green");
