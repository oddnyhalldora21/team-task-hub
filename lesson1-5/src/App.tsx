// import { useState } from 'react';
import './App.css';
import { Form } from './components/Form';
// import { ShopCard } from "./components/ShopCard";

function App() {
  // const [state, setState] = useState(false);
  return (
    <div className="w-full justify-center">
<<<<<<< HEAD
     <button onClick={() => setState(s => !s)} className="border border-black px-4 py-2 rounded">
  Click
</button>
=======
      {/* <button
        onClick={() => {
          setState((s) => !s);
        }}
      >
        {state ? 'Close Form' : 'Open Form'}
      </button> */}
>>>>>>> 1f51e3d6f18e00b2de6c02a6558745ea735df33f
      {/* <ShopCard />
      <ShopCard /> */}
      <Form />
      {/* {state && <Form />} */}
    </div>
  );
}

export default App;
