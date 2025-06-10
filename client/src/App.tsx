import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
}

export default App;
