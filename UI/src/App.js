import { useEffect, useState } from 'react';
import './App.css';
import Login from './Screen/Login';
import Cookies from 'js-cookie';
import Tab1 from './Screen/Tab1';
function App() {
  const cokie = Cookies.get('Token');
  const [Token, setToken] = useState(cokie === 'null' ? null : cokie);

  // console.log(Token);
  return (
    <div className="App">
      {Token ? (
        <Tab1 setToken={setToken} Token={Token} />
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
}

export default App;
