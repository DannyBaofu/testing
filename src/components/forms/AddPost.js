import React ,{ useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import Swal from "sweetalert2"
import axios from 'axios'

const AddPost = ({getPosts}) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const token = localStorage.getItem('token')
    const [post, setPost] = useState({
        name: "",
        description: "",
        price: "",
        category:"",
        image:""
    })

    const onhandleImage = (e) => {
        setPost({...post, image: e.target.files[0]});
     }

    const onChangeHandler = (e) => {
        setPost({
            ...post,
            [e.target.name]:e.target.value
        })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', post.image);
        formData.append('description', post.description);
        formData.append('category', post.category);
        formData.append('price', post.price);
        formData.append('name', post.name);

        axios({
            method: 'POST',
            url: `${SERVER_URL}items`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": token
            }
        })
        .then(res => Swal.fire("Success", res.data.msg, "success"))
        .catch(res => console.error(res))


    }

    return (

        <div>
            {
               userData !== null && userData.user.isAdmin === true ?
               <Card.Body className="col-md-6 mx-auto mt-5 " style={{border: '1px solid '}} >
            <Form onSubmit={onSubmitHandler} method="POST" encType='multipart/form-data'>
                <h3>Add Post</h3>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={post.name} onChange={onChangeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={post.description} onChange={onChangeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" value={post.category} onChange={onChangeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={post.price} onChange={onChangeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" accept=".png, .jpg,.jpeg" onChange={onhandleImage}></Form.Control>
                </Form.Group>
                <Button variant="success" type="submit">Add Post</Button>
            </Form>
            </Card.Body>
            : null
            }
        
        </div>
    )
}
export default AddPost