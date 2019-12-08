import React from "react";
import "behavior-state/react";
import { style } from "typestyle";
import { Model, textInput, grouped } from "./modellib";

const errorStyle = style({
  display: "block",
  padding: ".25rem 1rem",
  color: "#902901",
  background: "#e0c9c1"
});

export function FormDemo() {
  const form = createSignupForm();
  return (
    <div className="row">
      <form className="col-sm-8">
        <div className="form-group">
          <label htmlFor="email-input">Email</label>
          <div className="input-group">
            <FormInput id="email-input" type="text" model={form.items.email} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="password1-input">Password</label>
            <FormInput
              id="password1-input"
              type="password"
              model={form.items.passwords.items.password1}
            />
            <FormInput
              id="password2-input"
              type="password"
              model={form.items.passwords.items.password2}
            />
            <form.items.passwords.$errors.react
              nextItem={error => (
                <div id={error.id} className={errorStyle}>
                  {error.display}
                </div>
              )}
            />
          </div>
        </div>
        <button type="button" onClick={() => void form.reset()}>Reset</button>
      </form>
      <pre className="col-sm-4">
        Value
        <br />
        <form.items.email.$value.react next={a => a} />
      </pre>
    </div>
  );
}

function FormInput(props: { id: string; type?: string; model: Model<string> }) {
  return (
    <>
      <div className="input-group">
        <props.model.$value.react
          next={value => (
            <input
              type={props.type || "text"}
              className="form-control"
              id={props.id}
              value={value}
              onChange={evt => props.model.input(evt.target.value)}
            />
          )}
        />
      </div>
      <props.model.$errors.react
        nextItem={error => (
          <div id={error.id} className={errorStyle}>
            {error.display}
          </div>
        )}
      />
    </>
  );
}

function createSignupForm() {
  const email = textInput;
  const password1 = textInput;
  const password2 = textInput;

  const passwords = grouped({
    password1,
    password2
  });

  const formCtor = grouped({
    email,
    passwords
  });

  const form = formCtor({
    email: "",
    passwords: {
      password1: "",
      password2: ""
    }
  });

  form.items.passwords.$value.subscribe(val => {
    const { password1, password2 } = val;

    form.items.passwords.assert(
      val,
      "pwlen",
      "Password must be at least 8 characters",
      password1.length >= 8
    );
    form.items.passwords.assert(
      val,
      "pwcomplexity",
      "Password must have lowercase, uppercase, and numbers",
      /\d/.test(password1) && /[a-z]/.test(password1) && /[A-Z]/.test(password1)
    );
    form.items.passwords.assert(
      val,
      "pwmatch",
      "Passwords must match",
      password1 === password2
    );
  });

  form.items.email.$value.subscribe(val => {
    form.items.email.assert(
      val,
      "emailformat",
      "Email must look good",
      /^[\w"\.\-\@]+@[0-9a-zA-Z\.\-]+\.[a-zA-Z]{2,}$/.test(val)
    );
  });

  return form;
}
