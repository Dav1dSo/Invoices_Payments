import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './assets/components/Home/Home'
import NavBar from './assets/components/NavBar/NavBar';

function App() {

  return (
      <div>
        <NavBar/>
          <Home/>
      </div>
  )
}

export default App
