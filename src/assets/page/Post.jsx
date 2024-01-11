import "bootstrap/dist/css/bootstrap.min.css"
import {} from 'react-bootstrap/Navbar';
import {Navbar, Container,  Nav, Button } from 'react-bootstrap';
import Loader from "../components/loader";
import { useEffect, useState } from "react";
import axios from '../config/axios'
import {  ALL_POST } from "../config/url";
import "bootstrap-icons/font/bootstrap-icons.css";
import { jwtDecode } from "jwt-decode";


function Post() {
    const [showLoading, setShowLoading] = useState(false)
    const [post, setPost] = useState()
    const [user, setUser] = useState()


    const login = window.localStorage.getItem("CapacitorStorage.token")
    const userId = jwtDecode(login).id

    useEffect(() => {
        getPost()
        setUser(userId)

    },[])

    const getPost = async () => {

        const postId = window.location.pathname.split('/')[2]
        console.log(postId)

        setShowLoading(true)
        try {
            await axios.get(ALL_POST+ '/' + postId)
            .then(res => {
                setPost(res.data)
                console.log(res)
                setShowLoading(false)
            })
        } catch(e) {
            console.log(e)
            setShowLoading(false)
        }
    }

    return (
   <>
        {showLoading? <Loader isOpen={showLoading}/> :
            <>
            {login?  <Navbar bg="dark" data-bs-theme="dark">
            <Container> 
                <Navbar.Brand href="/">gallery</Navbar.Brand>
                <Nav className="">
                    <Nav.Link href="/myPost">
                        <Button variant="success">منشوراتي</Button>
                    </Nav.Link>
                    <Nav.Link href={`/create/${user}`} className=''>
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
             {post? 
                <div className="container">
                    <div className="row">
                        <div className=" ">
                            <div className="card">
                            <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                    <img src={post.image} className="card-img-top" />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                    <div className="card-body">
                                <h5 className=" float-end fs-2">{post.title}</h5>
                                <i className="bi bi-heart-fill float-start fs-2"></i>
                                <br/>
                                <br/>
                                <p className="card-text pt-3">{post.description}</p>
                            </div>
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>no post</div>
             }
            </>
        }
    </>

    )
}

export default Post