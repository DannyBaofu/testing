import React from "react"
import {Card,Button} from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import Swal from "sweetalert2"

const Orders = ({data}) => {
    console.log(data)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const token = localStorage.getItem("token")
    const orders = () => {
		fetch(`${SERVER_URL}orders`, {
		  method: 'GET',
		  headers: {
			"x-auth-token": localStorage.getItem("token")
		  }
		}).then(res => res.json())
		  .then(data =>  {
			  console.log(data)
			})
	  }
      
      return (
        <React.Fragment>
        <tr>
            <td>{data.name}</td>
            <td>{data.price}</td>
            <td>{data.quantity}</td>
        </tr>
    </React.Fragment>
      )
}


export default Orders