import React, { Component } from 'react';
import Rotatable from '../src';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleRotateStart = this.handleRotateStart.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
    this.handleRotateStop = this.handleRotateStop.bind(this);

    this.state = { angle: 0, text: 'Rotate me' };
  }

  handleRotateStart(e, element, angle) {
    this.setState({ text: 'Rotating...' });
  }

  handleRotate(e, element, angle) {
    this.setState({ angle: `${angle.toFixed(4)}deg` });
  }

  handleRotateStop(e, element, angle) {
    this.setState({ text: 'Rotate me' });
  }

  render() {
    const style = {
      width: '100px',
      height: '100px',
      border: '1px solid black',
      position: 'absolute',
      top: '100px',
      left: '100px',
      textAlign: 'center',
    };
    const { angle, text } = this.state;

    return (
      <div>
        <Rotatable
          onRotate={this.handleRotate}
          onRotateStart={this.handleRotateStart}
          onRotateStop={this.handleRotateStop}
        >
          <div style={style}>
            {text}
          </div>
        </Rotatable>

        <div>Rotated by: {angle}</div>
      </div>
    );
  }
}

export default App;
