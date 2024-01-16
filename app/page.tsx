
'use client'

import { useEffect, useState } from 'react';
import { Devnet } from './components/Devnet';
import { init } from './fhevmjs';
import { Connect } from './components/Connect';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setIsInitialized(true);
      })
      .catch(() => setIsInitialized(false));
  }, []);

  if (!isInitialized) return null;

  return (
    <div id="root">
      <h1>fhevmjs</h1>
      <Connect>{(account, provider) => <Devnet />}</Connect>
      <p className="read-the-docs">
        <a href="https://docs.zama.ai/fhevm">See the documentation for more information</a>
      </p>
    </div>
  );
}

export default App;
