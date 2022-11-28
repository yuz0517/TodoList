import logo from './logo.svg';
import './App.css';
import Template from './Components/Template'
import InputList from './Components/InputList'
import Item from './Components/Item'
import List from './Components/List'
const App = () => {
  return( 
    <Template>
      <InputList/>
      <List />
    </Template>
  )
};

export default App;
