import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { getTransformMatrix } from './helper';

class Rotatable extends Component {
  constructor(props) {
    super(props);

    this.handleStartRotate = this.handleStartRotate.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
    this.handleStopRotate = this.handleStopRotate.bind(this);

    this.state = { rotating: false, angle: 0 };
  }

  componentDidMount() {
    this.addHandle();
  }

  componentDidUpdate() {
    if (!this.state.rotating) {
      this.addHandle();
    }
  }

  componentWillUnmount() {
    if (this.handle) {
      this.handle.removeEventListener('mousedown', this.handleStartRotate);
    }
    document.removeEventListener('mouseup', this.handleStopRotate);
  }

  addHandle() {
    this.rotatable.querySelectorAll('.rotate-handle-holder').forEach(e => e.remove());
    if (!this.props.canRotate) {
      return;
    }

    this.handleContainer = document.createElement('div');
    this.handleContainer.classList.add('rotate-handle-holder');

    this.handle = document.createElement('div');
    this.handle.classList.add('rotate-handle');
    this.handleContainer.appendChild(this.handle);
    this.rotatable.appendChild(this.handleContainer);

    this.handle.addEventListener('mousedown', this.handleStartRotate);
    document.addEventListener('mouseup', this.handleStopRotate);
  }

  handleStartRotate(e) {
    let isRightButton = false;
    if ('which' in e) {
      isRightButton = e.which === 3;
    } else if ('button' in e) {
      isRightButton = e.button === 2;
    }

    if (isRightButton) {
      return;
    }

    const { onRotateStart } = this.props;

    e.stopPropagation();
    document.addEventListener('mousemove', this.handleRotate);

    if (onRotateStart) {
      onRotateStart(e, this.rotatable, this.state.angle);
    }

    this.setState({ rotating: true });
  }

  handleRotate(e) {
    e.stopPropagation();
    e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    if (!this.state.rotating) {
      return;
    }

    const { onRotate } = this.props;
    const bounds = this.rotatable.getBoundingClientRect();
    const centerX = bounds.left + (this.rotatable.clientWidth / 2);
    const centerY = bounds.top + (this.rotatable.clientHeight / 2);
    const mouseX = e.pageX - (document.documentElement.scrollLeft || document.body.scrollLeft);
    const mouseY = e.pageY - (document.documentElement.scrollTop || document.body.scrollTop);
    const angleRad = Math.atan2(mouseX - centerX, -(mouseY - centerY));
    const angleDeg = angleRad * ( 180 / Math.PI);

    // For translate rule.
    const matrixArray = getTransformMatrix(this.rotatable);
    this.rotatable.style.transform = `translate(${matrixArray[4]}px, ${matrixArray[5]}px) rotate(${angleDeg}deg)`;

    const angleNormalized = angleDeg > 0 ? angleDeg : 360 + angleDeg;

    this.setState({ angle: angleNormalized }, () => {
      if (onRotate) {
        onRotate(e, this.rotatable, angleNormalized);
      }
    });
  }

  handleStopRotate(e) {
    if (!this.state.rotating) {
      return;
    }

    const { onRotateStop } = this.props;

    document.removeEventListener('mousemove', this.handleRotate);

    this.setState({ rotating: false }, () => {
      if (onRotateStop) {
        onRotateStop(e, this.rotatable, `${this.state.angle}deg`);
      }
    });
  }

  render() {
    const children = React.Children.toArray(this.props.children);

    return React.cloneElement(children[0], {
      ref: el => this.rotatable = findDOMNode(el),
    });
  }
}

Rotatable.propTypes = {
  children: PropTypes.element.isRequired,
  onRotateStart: PropTypes.func,
  onRotate: PropTypes.func,
  onRotateStop: PropTypes.func,
  canRotate: PropTypes.bool,
};

Rotatable.defaultProps = {
  canRotate: true
};

export default Rotatable;
