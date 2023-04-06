// import logo from './logo.svg';
import './App.css';
import SideBar from './composants/SideBar'
import Main from './composants/Main'
import User from './composants/User'
import CreateNewToDO from './composants/CreateNewToDo'
import Calendar from './composants/Calendar'
import Projets from './composants/Projets'
import UpdateToDo from './composants/UpdateToDo'
import Todos from './composants/Todos'
import Footer from './composants/footer';




function App() {
  return (
    <div className="App">
      <SideBar>

          <User />
          <CreateNewToDO />
          <Calendar />
          <Projets />

      </SideBar>
      <Main>
            <Todos />
            <UpdateToDo />
            <Footer>
              <p> Footer </p>
            </Footer>

      </Main>
    </div>
  );
}

export default App;
