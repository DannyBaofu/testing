import React, { useState } from "react"
import { Form,Card, Button, Modal} from "react-bootstrap"
import { SERVER_URL } from "../config.json"
import Swal from "sweetalert2"
import EditPost from "./forms/EditPost"

const Post = ({data , getItems}) => {
	const userData = JSON.parse(localStorage.getItem('userData'))
	// console.log(userData)
	const token = localStorage.getItem("token")
	const [editing, setEditing] = useState(false)
	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
	const [cart, setCarts] = useState({
		itemId: data._id,
		quantity: ""
	})
	// console.log(cart)
	// console.log(data)

	const addToCartHandler = () => {
		fetch (`${SERVER_URL}carts`, {
			method:'POST',
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": token
			},
			body: JSON.stringify(cart)
		})
			.then(res => res.json())
			.then(data => {
				Swal.fire(
					'',
					data.msg,
					'success'
				)
			})
	}
	
	const onChangeHandler = (e) =>{
		setCarts({
			...cart,
			[e.target.name]: e.target.value
		})
	}

	const deleteHandler = (e) => {
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
			fetch(`${SERVER_URL}items/${data._id}`, {
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

	return(
		<Card className="m-4" style={{"width": "15rem"}}>
			{
				editing ? <EditPost data={data}/> :
				<Card.Body >
					<Card.Img variant="top" src={`${SERVER_URL}${data.image}`} />
					<Card.Title>Brand: {data.name}</Card.Title>
					<Card.Text>Description: {data.description}</Card.Text>
					<Card.Text>Category :{data.category}</Card.Text>
					<Card.Text>Rm :{data.price}</Card.Text>
				</Card.Body>
			}

			{
				userData !== null && userData.user.isAdmin === true ?
				<React.Fragment>
					<Button variant="warning" onClick={() => setEditing(!editing)}>
						{editing ? "Cancel" : "Edit"}
					</Button>
					<Button variant="danger" onClick={deleteHandler}>Delete</Button>
				</React.Fragment> : 
				<React.Fragment>
				{
					userData !== null && userData.user.isAdmin === false ?
				<React.Fragment>
					<Form.Group>
					<>
      <Button variant="primary" onClick={handleShow}>
        View Single Item
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
		<Card.Img variant="top" src={`${SERVER_URL}${data.image}`} />
        </Modal.Header>
        <Modal.Body>Brand: {data.name}</Modal.Body>
		<Modal.Body>Description: {data.description}</Modal.Body>
		<Modal.Body>CAtegory: {data.category}</Modal.Body>
		<Modal.Body>Rm: {data.price}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
                    <Form.Label className="mt-5">Quantity <Form.Control type="number" name="quantity" value={cart.quantity} onChange={onChangeHandler} ></Form.Control> </Form.Label>
                	</Form.Group>
					<Button variant="danger" onClick={addToCartHandler}>Add to Cart</Button>
				</React.Fragment>: null
				}
				</React.Fragment>
				}
		</Card>
	)
}

export default Post
