import React, { useState } from 'react'
import Button from './Button'

function App() {
    const [count, setCount] = useState<number>(1)
    return (
      <div>
          <h1>{count}</h1>
          <Button />
          <button onClick={() => setCount(count + 1)}>+</button>
          <button onClick={() => setCount(count - 1)}>-</button>
      </div>
    )
}

export default App