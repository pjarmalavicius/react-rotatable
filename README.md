react-rotatable [demo](https://pjarmalavicius.github.io/react-rotatable/)
=========================

Rotatable component implemented with react. Works even element has translate transformation :)

## Implementation guide

#### Installation

`yarn add react-rotatable`

#### Add styles

`import 'react-rotatable/dist/css/rotatable.min.css'`

## Example

```
import Rotatable from 'react-rotatable';
import 'react-rotatable/dist/css/rotatable.min.css';

class App extends Component {
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
      <Rotatable>
        <div style={style}>
          Rotate me
        </div>
      </Rotatable>
    );
  }
}

export default App;

```

## Props

#### onRotateStart
callback function called on start rotating. Gets arguments: event, dom element, current angle.

#### onRotate
callback function called on rotating. Gets arguments: event, dom element, current angle.

#### onStop
callback function called on stop rotating. Gets arguments: event, dom element, current angle.

#### canRotate
bool, default `true`, when `false` rotation is disabled.

## Development

```
git clone https://github.com/pjarmalavicius/react-rotatable.git
cd react-rotatable
yarn 
yarn run start
```

## License

MIT
