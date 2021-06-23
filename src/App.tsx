import React from 'react';
// import './App.css';
import Button, { ButtonType, ButtonSize } from './components/Button/Button'

function App() {
  return (
    <div className="App">
        <Button autoFocus> hello button </Button>
        <Button disabled> disabled button </Button>
        <Button
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}
          onClick={(e) => { console.log('large button')}}
        >
          primary button, large size
        </Button>
        <Button
          btnType={ButtonType.Link}
          href={`https://baidu.com`}
          target='_blank'
        >
          baidu link
        </Button>
        <Button
          btnType={ButtonType.Link}
          href={`https://baidu.com`}
          disabled
        >
          baidu link disabled
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
    </div>
  );
}

export default App;
