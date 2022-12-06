---
title: "Proactive Documentation with Progress Comments"
date: 2022-12-06T07:53:04-05:00
type: "post"
draft: false
---

Assuming you’ve all experienced [Technical Debt](../technical-debt), I'd like to talk about a novel strategy I've been using to prevent technical debt from growing out of hand for complex codebases. I used this strategy to manage the complexity of a collaborative text editor and low-code environment at a previous company, and it was highly successful. Even after a year, I feel confident that I could re-enter the codebase and continue feature development with relatively little re-learning due to our expansive usage of proactive “Progress Comments” we wrote as we added features.

In most projects I’ve worked on, time away from a project will make it harder to integrate into, but I’ve found that this strategy helps to ensure that even as I forget the details of how things worked, the correct details are still preserved in the codebase.

# Documentation Comments

Documentation comments are special comments that programmers can add to their code to explain what it does and how it works. The computer does not execute them, but they are visible to other programmers who read the code. Documentation comments can help programmers understand their own code and keep track of what is working and what is not.

Documentation comments are beneficial when a project becomes large and complex and when multiple programmers collaborate. They can help programmers communicate with each other, share information, and avoid duplication and inconsistency. They can also help programmers remember why they wrote the code in a certain way and what they thought when they made a particular decision.

## Retroactive Documentation

I'd like to present the following hypothetical retroactive documentation exercise. I hope that this process feels familiar. Later, I will use this as a contrast to how proactive documentation can make this same process much easier.

{{< meta-block >}}

To help programmers manage technical debt and improve their code, I propose the following exercise:

1. Choose a piece of code that you wrote many months ago and that you think might be hard to understand or maintain.

2. Read the code carefully, and try to understand what it does and how it works.

3. Add documentation comments to the code, explaining what each part does and why it was written that way.

4. Test the code to make sure it still works as expected.

5. Review the documentation comments, and make sure they are clear, accurate, and complete.

Here is an example of a piece of code before and after the documentation comment exercise:

```js
// before:
function sum(a, b) {
  return a + b;
}
```
```ts
// after:
/**
 * Calculates the sum of two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 */
function sum(a, b) {
  return a + b;
}
```

The documentation comments in the "after" version explain what the function does, what the parameters are, and what the return value is. They also specify the data type of the parameters and the return value using the standard [JSDoc](https://jsdoc.app/) format.

{{< /meta-block >}}

One limitation of a retroactive documentation comment exercise is that it relies on the knowledge and understanding of the original programmer who wrote the code. If the original programmer is unavailable, or if the original programmer has forgotten the details of the code or constraints, then the documentation comments may not provide enough information to other programmers who need to modify or extend the code. In this case, the programmers may need to spend additional time and effort to communicate with each other or to reverse-engineer the code to understand the business logic behind it.

The worst-case scenario, in my experience, is that the team fails to understand the code. Still, it’s used in a critical business process, meaning there’s a significant business risk to modifying the existing code. The interest on this technical debt continues to compound over time until this part of the codebase reaches a state of “bankruptcy”–when you cannot replace the code or extend the code meaningfully without significant costs or risks to the company.

# Progress Comments

A progress comment is a simple and effective strategy for managing technical debt and improving the quality of code. It requires contributor humility, which means acknowledging the limitations and uncertainties of the code, and being open to feedback and improvement.

A progress comment includes the following information about any interesting code:

1. A confidence in the "doneness" of the code. This is a score from -1 to 10, where -1 means "I wish this code wasn't written at all", 0 might mean "I am very unsure about whether this is the right way to model this problem", counting up to 5 which might mean "This is reasonably well designed and we've seen many features built on this functionality that all worked out pretty well", from there, any number higher is very unlikely to exist in your codebase unless you are particularly arrogant.

2. A list of known risks and constraints. This is a collection of bullet points that describe the assumptions, estimations, dependencies, or other factors that may affect the behavior or the performance of the code. Use concise and clear language to explain the risks and constraints and provide enough details to help other programmers understand the context and the implications of the code.

3. A list of next steps and improvements. This is a collection of bullet points that describe the actions or tasks that may be required to improve, modify, or extend the code in the future. Use practical and actionable language to explain the next steps and improvements and provide enough details to help other programmers plan and execute the tasks.

Here is an example of a progress comment that can be added to a piece of code:

```js
/**
 * Calculates the sum of two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 *
 * Progress 4/10:
 *
 * I am not sure if this is the right way to model this problem, but it seems to work for now.
 *
 * Risks:
 * - This function assumes that the input numbers are integers, and it may not work with other data types.
 * - This function does not check for overflow or underflow, and it may produce incorrect results in some cases.
 * - This function does not handle negative numbers, and it may produce incorrect results if the input numbers are negative.
 * Consider:
 * - Add unit tests to validate the correctness and the performance of this function.
 * - Add type annotations to enforce the data types of the input and the output.
 * - Add error handling to handle invalid or exceptional input.
 * - Add documentation comments to explain the assumptions, the risks, and the next steps.
 */
function sum(a, b) {
  return a + b;
}
```

In this example, the progress comment includes a confidence score, a list of known risks and constraints, and a list of next steps and improvements. It also includes a reference to the documentation comments, which explain the technical details and the functional requirements of the code.

In conclusion, progress comments are a simple and effective strategy for managing technical debt and improving code quality. They require contributor humility, and they provide valuable information to other programmers who work on the same code in the future. By using progress comments, programmers can collaborate more effectively, and they can help prevent technical debt from growing when we need to move on to other feature development.

### Shared on

 * [/r/programming](https://www.reddit.com/r/programming/comments/ze8i2y/progress_comments_as_proactive_documentation_re/)
 * [ycombinator](https://news.ycombinator.com/item?id=33880858)
 * [Mastodon](https://hachyderm.io/@colel/109467308373777962)
