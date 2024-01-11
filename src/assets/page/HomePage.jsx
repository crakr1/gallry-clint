import "bootstrap/dist/css/bootstrap.min.css"
import {Navbar, Container,  Nav, Button } from 'react-bootstrap';
import '../theme/loader.css'
import 'bootstrap'
import axios from '../config/axios'
import { ALL_POST  } from "../config/url";
import { useState, useEffect } from "react";
import Loader from "../components/loader";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { jwtDecode } from "jwt-decode";
function HomePage() {
    const [showLoading, setShowLoading] = useState(false)
    const [post, setPost] = useState()
    const [user, setUser] = useState()
    useEffect(() => {
        getPosts()
        setUser(userId)
    }, [])

    const login = window.localStorage.getItem("CapacitorStorage.token")

    const userId = jwtDecode(login).id

    const getPosts = async () => {
        setShowLoading(true)
        try {
            await axios.get(ALL_POST, {
                headers: {
                    Authorization: login
                }
            }).then(res => {
                console.log(res)
                setPost(res.data)
                setShowLoading(false)
                console.log(login)
                console.log(userId)
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
                    <Nav.Link href={`/myPost/${user}`}>
                        <Button variant="success">منشوراتي</Button>
                    </Nav.Link>
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
                                <Link className="p-2 col-sm-6 col-md-4" key={post._id} to={`/post/${post._id}`}>
                                    <div className="card " style={ {width: "100%"}}>
                                        <img src={post.image} className="card"  />
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

export default HomePage