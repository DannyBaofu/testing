import React, {useState} from "react"
import {Form} from "react-bootstrap"
import {SERVER_URL} from "../../config.json"
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom"

const Register = () =>{
	const history = useHistory()
	const [user, setUser] = useState({
		fullname: "",
		email: "",
		password: "",
		isAdmin: false

	})

	const onChangeHandler = (e) =>{
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		// if(user.password.length < 8) return Swal.fire('Error', "Password must be greater than 8 characters", 'error')
		// if(user.password !== user.password2) return Swal.fire('Error', "Password and confirm password must match", "error")

		fetch(`${SERVER_URL}users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		})
		.then(res => res.json())
		.then(data => {
			Swal.fire(
				"Success!",
				data.message,
				"success"
			)
			// setUser({
			// 	fullname: "",
			// 	email: "",
			// 	password: ""
			// })
		})
		.catch(e =>{
			Swal.fire(
				'Error',
				e.message,
				'error'
			)
		})
	}

	if(localStorage.hasOwnProperty('token') && localStorage.hasOwnProperty('userData')) {
        history.push("/")
    }

	return(

	<div className="maincontainer">
       <div class="container-fluid">
           <div class="row no-gutter">
               <div class="col-md-6 bg-light">
                   <div class="login d-flex align-items-center py-5">
                       <div class="container">
                           <div class="row">
                               <div class="col-lg-10 col-xl-7 mx-auto">
                                   <h3 class="display-4">Register Page</h3>
                                   <p class="text-muted mb-4">Welcome to Danny Ecommerce !</p>
                                   <Form onSubmit={onSubmitHandler} method="POST">
								   		<div class="form-group mb-3">
                                           <input name="fullname" value={user.fullname} onChange={onChangeHandler} type="fullname" placeholder="Fullname" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                       </div>
                                       <div class="form-group mb-3">
                                           <input name="email" value={user.email} onChange={onChangeHandler} type="email" placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                       </div>
                                       <div class="form-group mb-3">
                                           <input type="password" name="password" value={user.password} onChange={onChangeHandler} placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                       </div>
                                       <div class="form-group mt-5">
                                       <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100 " >Sign in</button>
                                       </div>
                                   </Form>
                               </div>
                           </div>
                       </div>
                   </div>   
               </div>
			   <div class="col-md-6 d-none d-md-flex bg-imageRegister"></div>
           </div>
       </div>
     </div>

	// 	<div className="col-md-6 mx-auto">
	// 		<h2 className="text-center"> Register Page </h2>
	// 		{JSON.stringify(user)}
	// 		<Form onSubmit={onSubmitHandler}>
	// 			<Form.Group>
	// 				<Form.Label> Fullname </Form.Label>
	// 				<Form.Control
	// 					type="text"
	// 					name="fullname"
	// 					value={user.fullname}
	// 					onChange={onChangeHandler} />
	// 			</Form.Group>

	// 			<Form.Group>
	// 				<Form.Label> Email </Form.Label>
	// 				<Form.Control
	// 					type="text"
	// 					name="email"
	// 					value={user.email}
	// 					onChange={onChangeHandler} />
	// 			</Form.Group>

	// 			<Form.Group>
	// 				<Form.Label> Password </Form.Label>
	// 				<Form.Control
	// 					type="password"
	// 					name="password"
	// 					value={user.password}
	// 					onChange={onChangeHandler} />
	// 			</Form.Group>
	// 			<Button variant="primary" type="submit"> Submit </Button>
	// 		</Form>
	// 	</div>
	)
}

export default Register