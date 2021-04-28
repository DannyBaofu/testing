import React  from "react"
import { Navbar, Image ,Form , Button , FormControl } from "react-bootstrap"
import { Link } from "react-router-dom"
import { GiConverseShoe } from 'react-icons/gi';
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink
  } from "./NavbarElements"

const TopNav = ({userData, handleLogout, isLogin}) => {
	const userDataOne = JSON.parse(localStorage.getItem('userData'))
	return(
		<Nav>
        <NavLink to='/'>
		<Navbar.Brand href="/" ><b>SNEAKER LAB <GiConverseShoe size="30"/></b></Navbar.Brand>
        </NavLink>
        <NavMenu>
        <NavBtn>
		  {
			  "userData" in localStorage ?
			  <React.Fragment>
				  {
					  userDataOne !== null && userDataOne.user.isAdmin === true ?
					  <React.Fragment>
						<NavBtnLink to="/" onClick={()=> handleLogout()}>Logout</NavBtnLink>
					  </React.Fragment>:
				  <React.Fragment>
      					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				  <NavLink to="/Men" >Men</NavLink>
				  <NavLink to="/women" activeStyle>Women</NavLink>
				  <NavLink to="/events" activeStyle>Events</NavLink>
				  {/* <NavLink to="/whatnew" activeStyle>What's New</NavLink> */}
				  <NavLink to="/cart" >Cart</NavLink>
				  <NavLink to="/orders" >Orders</NavLink>
				  <NavBtnLink to="/" onClick={()=> handleLogout()}>Logout</NavBtnLink>
				  </React.Fragment>
}
			  </React.Fragment>
			  :
			  <React.Fragment>
				  <NavBtnLink to="/login">Login</NavBtnLink>
				  <NavBtnLink to="/register">Register</NavBtnLink>
			  </React.Fragment>
		  }
        </NavBtn>
		</NavMenu>
      </Nav>
		// <Navbar bg="dark" expand="md" variant="dark">
		// 	<Navbar.Brand href="/">Ecommerce</Navbar.Brand>
		// 	<Navbar.Toggle aria-controls="menu" />
		// 	<Navbar.Collapse id="menu">
				// <Nav2 className="mr-auto">
				// 	<Link to="/" className="nav-link">Home</Link>
				// 	{
				// 		"userData" in localStorage ?
				// 		<React.Fragment>
				// 			<Link to="/myposts" className="nav-link">My Posts</Link>
				// 			<Link to="/" className="nav-link" onClick={() => handleLogout()}>Logout</Link>
				// 		</React.Fragment> 
				// 		:
				// 		<React.Fragment>
				// 			<Link to="/login" className="nav-link">Login</Link>
				// 			<Link to="/register" className="nav-link">Register</Link>
				// 		</React.Fragment>
				// 	}
				// </Nav2>
		// 	</Navbar.Collapse>
		// </Navbar>
	
	)
}
export default TopNav