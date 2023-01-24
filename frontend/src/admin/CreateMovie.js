import React, {useState} from 'react';
import Wrapper from "./Wrapper";
import {Redirect} from "react-router-dom";

const CreateMovie = () => {
    const [title, setTitle] = useState("")
    const [imageLink, setImageLink] = useState("")
    const[redirect, setRedirect] = useState(false)
    const submit = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:8000/api/movies', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title : title,
            image: imageLink})
        })
        setRedirect(true)
    }

    if(redirect) {
        return <Redirect to='/admin/movies'/>
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mt-4 form-group">
                    <label>Title</label>
                    <input type="text" className="mt-2 form-control" name="title"
                    onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="mt-4 form-group">
                    <label>Image Link</label>
                    <input type="text" className="mt-2 form-control" name="image"
                    onChange={e => setImageLink(e.target.value)}/>
                </div>
                <button className="mt-4 btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default CreateMovie;