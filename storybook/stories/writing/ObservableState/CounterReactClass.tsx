import React from "react";

export class CounterReactClass extends React.Component<{}, { counter: number }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      counter: 1
    };

    this.addOne = this.addOne.bind(this);
    this.subtractOne = this.subtractOne.bind(this);
  }

  subtractOne() {
    this.setState(state => ({ counter: state.counter - 1 }));
  }

  addOne() {
    this.setState(state => ({ counter: state.counter + 1 }));
  }

  render() {
    return (
      <>
        <button onClick={this.subtractOne}>-</button>
        <span style={{ margin: "1em" }}>{this.state.counter}</span>
        <button onClick={this.addOne}>+</button>
      </>
    );
  }
}
