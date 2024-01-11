import "bootstrap/dist/css/bootstrap.min.css"
import {Navbar, Container,  Nav, Button } from 'react-bootstrap';
import '../theme/loader.css'
import 'bootstrap'
import axios from '../config/axios'
import {  GET_MY_POST} from "../config/url";
import { useState, useEffect } from "react";
import Loader from "../components/loader";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { jwtDecode } from "jwt-decode";
import "bootstrap-icons/font/bootstrap-icons.css";

function GetMyPosts() {
    const [showLoading, setShowLoading] = useState(false)
    const [post, setPost] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        getMyPost()
        setUser(userId)
    }, [])

    const login = window.localStorage.getItem("CapacitorStorage.token")
    const userId = jwtDecode(login).id

    
    const getMyPost = async () => {
        setShowLoading(true)
        try {
            await axios.get(GET_MY_POST + '/' + userId, {
                headers: {
                    Authorization: login
                }
            }).then(res => {
                console.log(res)
                setPost(res.data)
                setShowLoading(false)
            })
        } catch(e) {
            console.log(e)
            setShowLoading(false)
        }
    }

    return (   
   <>
   {showLoading? <Loader isOpen={showLoading}/>: 
   <>
     {login?  <Navbar bg="dark" data-bs-theme="dark">
            <Container> 
                <Navbar.Brand href="/">gallery</Navbar.Brand>
                <Nav className="">
                    <Nav.Link href={`/create/${userId}`} className=''>
                    <Button variant="primary">انشاء منشور</Button>
                    </Nav.Link>
                </Nav>
            </Container>    
        </Navbar>
        : 
            <Navbar bg="dark" data-bs-theme="dark">
            <Container> 
                <Navbar.Brand href="/">gallery</Navbar.Brand>
                <Nav className="">
                    <Nav.Link href="/login">
                        <Button variant="success">تسجيل دخول</Button>
                    </Nav.Link>
                    <Nav.Link href="/register" className=''>
                    <Button variant="primary">انشاء حساب</Button>
                    </Nav.Link>
                </Nav>
            </Container>    
        </Navbar>
        }
       { 
       <div className="container">
            <div className="row" >
                {
                     post?.slice().reverse().map((post) => {
                            return(
                                <Link className="p-2 col-sm-6 col-md-4" key={post._id}>
                                    <div className="card ">
                                        <img src={post.image} className="card" />
                                        <div className="card-body">
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">{post.description}</p>

                                            <a className="btn btn-primary float-start">
                                               <b className="mr-1">تعديل</b>
                                            <i className="bi bi-pencil-square"></i>
                                            </a>
                                            <a className="btn btn-danger float-end">
                                            <b className="mr-1">حذف</b>
                                            <i className="bi bi-trash3-fill"></i>
                                            </a>
                                            
                                        </div>
                                    </div>
                                </Link>  
                            )
                       })
                }
            </div>
       </div>
      }

   </>
   }
 
    </>

    )
}

export default GetMyPosts