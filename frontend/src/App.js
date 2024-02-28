import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import EmployeeForm from './Components/EmployeeForm';
import DisplayPage from './Components/DisplayPage';
import LandingPage from './Components/LandingPage';
import AdminLogin from './Components/Admin/AdminLogin';
import CreateTask from './Components/Admin/CreateTask';
import TasksCreated  from './Components/Admin/TasksCreated';
import DisplayTasks from './Components/DisplayTasks';
import Login from './Components/Login';
import ProfilePage from './Components/Profile';
import LandingPage2 from './Components/Admin/LandingPage2';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/form' element={<EmployeeForm/>}/>
          <Route path='/adminlogin' element={<AdminLogin/>} />
          <Route path='/display' element={<DisplayPage/>}/>
          <Route path='/createtask' element={<CreateTask/>} />
          <Route path='/taskscreated' element={<TasksCreated />} />
          <Route path='/tasks' element={<DisplayTasks/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/profile' element={<ProfilePage  />} />
          <Route path='/adminland' element={<LandingPage2/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
