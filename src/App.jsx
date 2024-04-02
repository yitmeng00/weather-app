import "./App.css";
import Sidebar from "./layouts/Sidebar";
import { Dashboard } from "./pages/Dashboard/Dashboard";

function App() {
    return (
        <>
            <div className="flex flex-row h-screen">
                <Sidebar />
                <Dashboard />
            </div>
        </>
    );
}

export default App;
