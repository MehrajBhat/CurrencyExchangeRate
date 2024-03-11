import * as React from 'react';
import CurrencyConverter from './components/currencyConverter/currencyConverter';

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <header className="App-header">       
       <CurrencyConverter/>
      </header>
    </div>
  );
}

export default App;
