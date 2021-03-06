import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useParams } from "react-router-dom";
import{GrAdd} from"react-icons/gr";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function OrdersTable() {
  // const { id } = useParams();
  const [ordersDash, setodersDash] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => {
        setodersDash(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ordersDash]);

  

  // const loadorders = async () => {
  //   const result = await axios.get(`http://localhost:4000/orders/${id}`);
  //   setodersDash(result.data);
  // };


  const deleteorder= async id=>{
    await axios.delete(`http://localhost:4000/orders/${id}`);
};

if (!currentUser || currentUser.isAdmin !== "true") {
  return <Redirect to="/" />;
}
  return (
    <>
   
      <h3 className="my-3">Recent Orders</h3>
      {/* <div className=" d-flex justify-content-end"><Link class="btn btn-warning w-25 mb-2 ms-2" to="/Meals/add">Add a order <GrAdd/> </Link></div> */}
      <div className="col">
        <table className="table bg-white rounded shadow-sm  table-hover">
          <thead>
            <tr>
              <th scope="col" width={50}>
                #
              </th>
              <th scope="col">user name</th>
              <th scope="col">email</th>
              <th scope="col">phone</th>
              <th scope="col">location</th>
              <th scope="col">Created at</th>
              <th scope="col">Total price</th>
              <th scope="col">order</th>
              <th scope="col">delete</th>

              {/* <th scope="col">Price</th> */}
            </tr>
          </thead>
          <tbody>

    
            {ordersDash.map((order, i) => {
              return (
                <>
                  <tr key={order._id}>
                    <th scope="row"> {i+1} </th>
                    {/* <td><img src={`${order.username}`} style={{width:'100px'}} alt="..."/></td> */}
                    <td>{order.username}</td>
                    <td>{order.email}</td>
                    <td>{order.phone}</td>
                    <td>{order.location}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.total}</td>
                    {/* <td>{order.orders}</td> */}

                    {/* <td>{order.orders[1].name}</td> */}
                       {/* {console.log(order.orders[0])} */}
                       <td><Link class="btn btn-success" key={order.id} to={`/orders/view/${order._id}`}>view</Link></td>

                    <td><Link class="btn btn-danger" onClick={()=>deleteorder(order._id)}>Delete</Link></td>

                    {/* <td>{order.orders}</td> */}

                    {/* <td>{order.orders[[1][name]]}</td> */}
                    {/* <td>{order(Array,'orders').name}</td> */}
                   
                    {/* dig(data, 'level3') */}
                    {/* <td>{order}</td> */}
                    {/* data[1]['id'] */}
                    {/* data['items'][1]['name'] */}
                      {/* order.['orders'][1]['name'] */}

                    {/* <td><Link class="btn btn-success" to={`/Meals/edit/${product._id}`}>Edit</Link></td> */}
                    {/* <td><Link class="btn btn-danger" onClick={()=>deleteMeal(product._id)}>Delete</Link></td> */}
                  </tr>
                </>
              );

            })}
          </tbody>
        </table>
      </div>
    </>
  );
}