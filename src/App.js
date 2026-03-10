import { useDispatch, useSelector } from 'react-redux'

function App() {
  const counter = useSelector(state => state)
  const dispatch = useDispatch()

  return (
   <div>
      <div>{counter}</div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>
        zero
      </button>
    </div>  
  );
}

export default App
