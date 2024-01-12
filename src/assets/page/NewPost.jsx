import Loader from "../components/loader";
import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import axios from '../config/axios'
// import {  CREATE_POST} from "../config/url";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";


function NewPost() {
    const [showLoading, setShowLoading] = useState(false)
    const [user, setUser] = useState()
    const [file, setFile] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    const history = useHistory()

    const login = window.localStorage.getItem("CapacitorStorage.token")
    const userId = jwtDecode(login).id


    const CREATE_POST = `/api/post/create/${userId}`

    function reFresh() {
        window.location.reload(false)
    }


    const onSubmit = async () => {
        setShowLoading(true)

        const formData = new FormData()
        formData.append('image', file)
        formData.append('title', title)
        formData.append('description', description)

        try {
            await axios.post(CREATE_POST, formData)
                .then(res => {
                    console.log(res)
                    history.push('/')
                    reFresh
                })
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setShowLoading(false)

        }
    }


    useEffect(() => {

        setUser(userId)
    }, [userId, setUser])

    if (showLoading) return <Loader />

    return (
        <>

            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">gallery</Navbar.Brand>
                    <Nav className="">
                        {!login ? <>

                            <Nav.Link href="/login">
                                <Button variant="success">تسجيل دخول</Button>
                            </Nav.Link>
                            <Nav.Link href="/register" className=''>
                                <Button variant="primary">انشاء حساب</Button>
                            </Nav.Link>
                        </> : <>
                            <Nav.Link href={`/myPost/${user}`}>
                                <Button variant="success">منشوراتي</Button>
                            </Nav.Link>
                        </>}
                    </Nav>
                </Container>
            </Navbar>
            <div className="container mt-4">
                <div className="card">
                    <form className="p-4">
                        <div className="form-floating mb-3">
                            <input className="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea1"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                            <label htmlFor="floatingTextarea1">الوصف</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ height: "100px" }}></textarea>
                            <label htmlFor="floatingTextarea2">الوصف</label>
                        </div>
                        <div className="text-center">
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className="d-grid gap-2 " >
                            <button className="btn btn-primary" type="button" onClick={onSubmit}>نشر المنشور </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
export default NewPost