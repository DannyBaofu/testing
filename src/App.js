import React, { useState, useEffect } from "react"
import TopNav from "./Navbar"
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"
import Login from "./components/forms/Login"
import Register from "./components/forms/Register"
import jwt_decode from "jwt-decode"
import { SERVER_URL } from "./config.json"
import Post from "./components/Homepage"
import AddPost from "./components/forms/AddPost"
import Cart from "./components/forms/Cart"
import Order from "./components/forms/Orders"
import { Form,Card, Button, Modal} from "react-bootstrap"
import Swal from "sweetalert2"

function App() {
	const [userData, setUserData] = useState({})
	const [token, setToken] = useState("")
	const [posts, setPosts] = useState([])
	// const [carts, setCarts] = useState([])
	const [myPosts, setMyPosts] = useState([])
	const [myOrders, setMyOrders] = useState([])
	const [isLogin, setIsLogin] = useState(false)
	const [myCarts, setMyCarts] = useState([])
	const [cart,setCart] = useState([])
	const [order , setOrder] = useState([])

	const getPosts = () => {
		fetch(`${SERVER_URL}items`)
		.then(res => res.json())
		.then(data => setPosts(data))
	}

	
	const getOrders = () => {
		fetch(`${SERVER_URL}orders`, {
		  method: 'GET',
		  headers: {
			"x-auth-token": localStorage.getItem("token")
		  }
		}).then(res => res.json())
		.then(data => setMyOrders(data))
	  }

	  const getMyPosts = () => {
		fetch(`${SERVER_URL}items`, {
			method: 'GET',
			headers: {
				"x-auth-token": localStorage.getItem('token')
			}
		})
		.then(res => res.json())
		.then(data => setMyPosts(data))
	}

	const getMyCarts = () => {
		fetch(`${SERVER_URL}carts`, {
		  method: 'GET',
		  headers: {
			"x-auth-token": localStorage.getItem("token")
		  }
		}).then(res => res.json())
		  .then(data =>  {
			  setCart(data)
			  setMyCarts(data.items)
			})
	  }

	useEffect( () => {
		getPosts()
		getMyPosts()
		getMyCarts()
	}, [])
	
	
	const showPosts = posts.map(post => <Post key={post._id} data={post}/>)

	const handleLogin = (user) => {
		let decoded = jwt_decode(user.token)
		setToken(user.token)
		setUserData(decoded)
		localStorage.setItem('userData', JSON.stringify(decoded))
		localStorage.setItem('token', user.token)
		setIsLogin(true)
	}

	const handleLogout = () => {
		setToken()
		setUserData({})
		localStorage.removeItem('userData')
		localStorage.removeItem('token')
	}

	const deleteHandler = (id) => {
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.isConfirmed) {
			fetch(`${SERVER_URL}carts/empty/`+id , {
				method: "DELETE",
				headers: {
					"x-auth-token": localStorage.getItem("token")
				}
			})
			.then(res => res.json())
			.then(data => {
				Swal.fire(
					'Deleted',
					data.msg,
					'success'
				)
			})
		  }
		})
	}

	const checkoutHandler = (id) => {
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You will be purchasing all the items in the cart !",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, purchase it!'
		}).then((result) => {
		  if (result.isConfirmed) {
			fetch(`${SERVER_URL}orders` , {
				method: "POST",
				headers: {
					"Content-Type":"application/json",
					"x-auth-token": localStorage.getItem("token")
				}
			})
			.then(res => res.json())
			.then(data => {
				Swal.fire(
					'Purchase Successfully',
					data.msg,
					'success'
				)
			})
		  }
		})
	}
	console.log(myOrders)
	return (
	  	<Router>
			 
			<div className="App">
				<TopNav userData={userData} handleLogout={handleLogout} isLogin={isLogin}/>
				{localStorage.hasOwnProperty('token') && localStorage.hasOwnProperty('userData') ?
					<AddPost getPosts={getPosts} /> : null
				}
				<Switch>
					<Route path="/login"> 
						<Login handleLogin={handleLogin}/> 
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/cart">
						<h3 className="text-center">Carts</h3>
						{
                            
                            <Button className = "mx-auto" variant="danger" onClick={() => deleteHandler(cart._id)}>Empty Cart</Button>
                        }
							<Button className = "mx-auto" variant="warning" onClick={() => checkoutHandler()}>Checkout</Button>
						{
							myCarts?.length ?
							myCarts.map(cart => <Cart key={cart._id} data={cart} />):
							<h2 className ="text-center">Your cart is empty !</h2>
						}
					</Route>
					<Route path="/myposts">
						{
							myPosts.length ? 
							myPosts.map(post => <Post key={post._id} data={post} />) :
							<h2>No posts to show</h2>
						}
					</Route>
					<Route path="/orders">
						{
							myOrders.length ? 
							myOrders.map(order => <Order key={order._id} data={order} />) :
							<h2>No orders to show</h2>
						}
					</Route>
					<Route path="/">
						<div className ="row container-fluid">
						{showPosts}
						</div>
					</Route>
				</Switch>
			</div>
	    </Router>
	);
}

export default App