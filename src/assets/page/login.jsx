import "bootstrap/dist/css/bootstrap.min.css"
import { Card, Container, Navbar, Nav,Button} from 'react-bootstrap';
import '../theme/login.css'
import axios from '../config/axios'
import { LOGIN_URL } from "../config/url";
import { useState } from "react";
import Loader from "../components/loader";
import { useHistory } from "react-router-dom";
import { Preferences } from '@capacitor/preferences';


import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const notify = () => {
    toast.error("البريد الاكتروني او كلمة المرور غير صحيح ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }) 
}


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    const history = useHistory()

  function reFresh() {
    window.location.reload(false)
  }



    const onSubmit = async () => {
        setShowLoading(true)
        const loginForm = {
            email,
            password
        }
        try{
            await axios.post(LOGIN_URL, loginForm ).then(res => {
                Preferences.set({
                    key: "token",
                    value: res.data.token
                })
                history.push('/')
                reFresh
                setShowLoading(false)
            })
        } catch (e) {
           
            console.log(e)
            setShowLoading(false)
        }
    }

    return (
    <>
     {showLoading? <Loader isOpen={showLoading}/> : 
     <>
         <Navbar bg="dark" data-bs-theme="dark">
            <Container> 
                <Navbar.Brand href="/">gallery</Navbar.Brand>
                <Nav className="">
                    <Nav.Link href="/register" className=''>
                    <Button variant="primary">انشاء حساب</Button>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>           
        <Container className="card-theme" >
        <ToastContainer />
            <Card className="mt-5 card-" >
                <Card.Body>
                    <Card.Title> تسجيل دخول</Card.Title>
                    <form >
                        <div className="form-floating mb-3">
                            <input type="email" 
                            className="form-control" id="floatingInput" 
                            placeholder="name@example.com" 
                            value={email} onChange={(e) => {setEmail(e.target.value)}}
                            />
                            <label htmlFor="email">البريد الاكتروني</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password"
                            className="form-control " 
                            placeholder="Password" 
                            value={password} onChange={(e) => {setPassword(e.target.value)}}
                            />
                            <label htmlFor="password">الرمز</label>
                        </div>
                        <button onClick={() => {onSubmit()}} className="btn btn-primary" onSubmit={onSubmit}>تسجيل الدخول</button>
                    </form>   
                    <div className="mt-3"> ليس لديك حساب؟<a className="link" href="/register"> انشاء حساب</a></div> 
                </Card.Body>
            </Card>

        </Container>    
     </>
}
    </>

    )
}

export default Login