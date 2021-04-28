import React from "react"
import {Card,Button} from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import Swal from "sweetalert2"

const Cart = ({data}) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const token = localStorage.getItem("token")

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
			fetch(`${SERVER_URL}carts/${data.itemId}`, {
				method: "DELETE",
				headers: {
					"x-auth-token": token
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

    return (
        <div>
            <div className="container-fluid col-md-6">
                <Card className="my-3">
                    <div className ="d-flex">
                        <Card.Img variant="top" src={`${SERVER_URL}${data.image}`} style={{"height":"10rem"}, {"width":"15rem"}} />
                        <Card.Body className="text-center ">
                            <Card.Title>Name : {data.name}</Card.Title>
                            <Card.Text>Price : {data.price}</Card.Text>
                            <Card.Text>Quantity : {data.quantity}</Card.Text>
                            <Card.Text>SubTotal : {data.subtotal}</Card.Text>
                            {
                                userData !== null && userData.user.isAdmin === false ?
                                <Button variant="danger" onClick={deleteHandler}>Delete</Button>
                                : null
                            }
                        </Card.Body>
                    </div>
                </Card>
            </div>
        </div>
    )
}
export default Cart