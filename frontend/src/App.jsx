import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
	return (
		<div className="App">
			<Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
		</div>
	);
}

export default App;
