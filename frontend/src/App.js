
import './App.css';
import Nav from "./admin/components/Nav";
import Menu from "./admin/components/Menu";
import Movies from "./admin/Movies";
import Main from "./main/Main";
import {BrowserRouter, Route} from "react-router-dom";
import CreateMovie from "./admin/CreateMovie";
import UpdateMovie from "./admin/UpdateMovie";


function App() {
  return (
    <div className="App">

                <BrowserRouter>
                    <Route exact path='/' component={Main}/>
                    <Route exact path='/admin/movies' component={Movies}/>
                    <Route exact path='/admin/movies/create' component={CreateMovie}/>
                    <Route exact path='/admin/movies/:id/update' component={UpdateMovie}/>
                </BrowserRouter>

    </div>
  );
}

export default App;
