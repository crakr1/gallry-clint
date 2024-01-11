import "bootstrap/dist/css/bootstrap.min.css"
import {} from 'react-bootstrap/Navbar';
import { useState } from "react";
import {Navbar, Container,  Nav, Button } from 'react-bootstrap';
import Loader from "../components/loader";
import { jwtDecode } from "jwt-decode";


function NotFoundPage() {
    const [showLoading, setShowLoading] = useState(false)
    const login = window.localStorage.getItem("CapacitorStorage.token")
    const userId = jwtDecode(login).id
        return (
        <>
         {showLoading? <Loader isOpen={showLoading}/>: 
    <>
        {login?  <Navbar bg="dark" data-bs-theme="dark">
                <Container> 
                    <Navbar.Brand href="/">gallery</Navbar.Brand>
                    <Nav className="">
                        <Nav.Link href="/myPost">
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
        <div className="container text-center">
            <h1 className="mt-3 p-3 bg-dark text-primary">الصفحة المطلوبة غير موجودة</h1>
            <a href="/" className="btn btn-primary">الرجوع الى الصفحة الرئيسية</a>
        </div>
            </>
    }
        </>
  
    )
}

export default NotFoundPage