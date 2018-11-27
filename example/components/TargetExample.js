import React from "react";

import TargetHOC from "./../../TargetHOC";

class TargetExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleTest: false
    };

    this.toggleStatus = this.toggleStatus.bind(this);
  }
  toggleStatus() {
    this.setState({
      simpleTest: !this.state.simpleTest
    });
  }
  componentDidUpdate() {
    if (this.props.targetUpdate) {
      this.props.targetUpdate();
    }
  }
  render() {
    const { simpleTest = false } = this.state;
    return (
      <div>
        <p>Hallo world</p>
        {simpleTest && <p className="halloworld">This is just a test </p>}
        <button onClick={this.toggleStatus}>Click me</button>
      </div>
    );
  }
}

export default TargetHOC(TargetExample);
