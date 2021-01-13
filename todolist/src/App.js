import logo from './logo.svg';
import './App.css';
// 위에서 내보낸 firestore 가져오기
import { firestore } from "./firebase";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          hello world!
        </a>
      </header>
    </div>
  );
}

const fetchData = useCallback(() => {
  let tasksData = [];

  firestore
      .collection("tasks") 
      .get() 
      .then((docs) => {
      docs.forEach((doc) => {
          tasksData.push({ todo: doc.data().todo, id: doc.id });
      });
      setTasks((prevTasks) => prevTasks.concat(tasksData));
  });
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);

const removeHandler = (id) => {
  firestore
    .collection("tasks")
    .doc(id) 
    .delete() 
    .then(() => 
      setTasks((prevTasks) =>
        prevTasks.filter((prevTask) => id !== prevTask.id)
      )
    );
};

const onClickHandler = (e) => {
  e.preventDefault();

  if (task !== "") {
    firestore
      .collection("tasks")
      .add({ todo: task }) 
      .then((res) => { 
    
        setTasks((prevTasks) => tasks.concat({ todo: task, id: res.id }));
      });
      
    setTask("");
  }
};

export default App;

