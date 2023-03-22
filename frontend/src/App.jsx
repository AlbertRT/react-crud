import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";

function App() {
	return (
		<div className="App">
			
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
