import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import Swal from "sweetalert2"
import axios from 'axios'

const EditPost = ({data}) => {
	const userData = JSON.parse(localStorage.getItem('userData'))
	const [updatedPost, setUpdatedPost] = useState({
		name: data.name,
		description: data.description,
		category: data.category,
		price: data.price
	})

	    const onhandleImage = (e) => {
        setUpdatedPost({...updatedPost, image: e.target.files[0]});
     }

	const onChangeHandler = (e) => {
		setUpdatedPost({
			...updatedPost,
			[e.target.name]: e.target.value
		})
	}

	const token = localStorage.getItem('token')

	const onSubmitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', updatedPost.image);
        formData.append('description', updatedPost.description);
        formData.append('category', updatedPost.category);
        formData.append('price', updatedPost.price);
        formData.append('name', updatedPost.name);

        axios({
            method: 'PUT',
            url: `${SERVER_URL}items/${data._id}`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": token
            }
			
        })
        .then(res => Swal.fire("Success", res.data.msg, "success"))
        .catch(res => console.error(res))
    }

	return(
		<div>
			{
				userData !== null && userData.user.isAdmin === true ?
		<Form onSubmit={onSubmitHandler} method="POST">
			<Form.Group>
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" name="name" value={updatedPost.name} onChange={onChangeHandler}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Description</Form.Label>
				<Form.Control type="text" name="description" value={updatedPost.description} onChange={onChangeHandler}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Category</Form.Label>
				<Form.Control type="text" name="category" value={updatedPost.category} onChange={onChangeHandler}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Price</Form.Label>
				<Form.Control type="number" name="price" value={updatedPost.price} onChange={onChangeHandler}/>
			</Form.Group>
			<Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" accept=".png, .jpg,.jpeg" onChange={onhandleImage}></Form.Control>
                </Form.Group>
			<Button variant="success" type="submit">Update Post</Button>
		</Form>
			:null
			}
		</div>
	)
}

export default EditPost