import React from "react";

type State = { count: number };

export class CounterClass extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      count: 1
    };

    this.addOne = this.addOne.bind(this);
    this.subtractOne = this.subtractOne.bind(this);
  }

  subtractOne() {
    this.setState(state => ({ count: state.count - 1 }));
  }

  addOne() {
    this.setState(state => ({ count: state.count + 1 }));
  }

  render() {
    return (
      <>
        <button onClick={this.subtractOne}>-</button>
        <span style={{ margin: "1em" }}>{this.state.count}</span>
        <button onClick={this.addOne}>+</button>
      </>
    );
  }
}
