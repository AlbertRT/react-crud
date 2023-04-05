import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import Product from "./Components/Product/Product";
import Account from "./Components/Account/Account";
import Profile from "./Components/Account/Profile/Profile";
import Wishlist from "./Components/Account/Wishlist/Wishlist"
import Cart from './Components/Account/Cart/Cart'
import Settings from './Components/Account/Settings/Settings'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/product/" element={<Navigate to={'/'} />} />
				<Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />}>
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="wishlist/:id" element={<Wishlist />} />
                    <Route path="cart/:id" element={<Cart />} />
                    <Route path="cart/" element={<Navigate to={'/login'} />} />
                    <Route path="settings/:id" element={<Settings />} />
                </Route>
			</Routes>
		</div>
	);
}

export default App;
