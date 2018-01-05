import React, { Component } from 'react';
import Rotatable from '../src';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleRotate = this.handleRotate.bind(this);

    this.state = { angle: 0 };
  }

  handleRotate(e, element, angle) {
    this.setState({ angle: `${angle.toFixed(4)}deg` });
  }

  render() {
    const style = {
      width: '100px',
      height: '100px',
      border: '1px solid black',
      position: 'absolute',
      top: '100px',
      left: '100px',
    };

    return (
      <div>
        <Rotatable onRotate={this.handleRotate}>
          <div style={style}>
            Rotate me
          </div>
        </Rotatable>

        <div>Rotated by: {this.state.angle}</div>
      </div>
    );
  }
}

export default App;
