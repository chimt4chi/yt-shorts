import { WiDirectionDown, WiDirectionUp } from "react-icons/wi";
import Container from "./components/Container";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Container />
    </div>
  );
}

export default App;
