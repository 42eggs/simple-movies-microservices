import React, {useEffect, useState} from 'react';
import Wrapper from "./Wrapper";
import {Redirect} from "react-router-dom";

const UpdateMovie = (props) => {
    const [title, setTitle] = useState("")
    const [imageLink, setImageLink] = useState("")
    const[redirect, setRedirect] = useState(false)


    useEffect(()=> {
        (
            async () => {
                const response = await fetch(`http://localhost:8000/api/movies/${props.match.params.id}`)
                const movie = await response.json()
                setTitle(movie.title);
                setImageLink(movie.image)
            }
        )()
    }, [])
    const submit = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:8000/api/movies/${props.match.params.id}`, {
            method: 'PUT',
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
                    defaultValue={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="mt-4 form-group">
                    <label>Image Link</label>
                    <input type="text" className="mt-2 form-control" name="image"
                    defaultValue={imageLink}
                           onChange={e => setImageLink(e.target.value)}/>
                </div>
                <button className="mt-4 btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default UpdateMovie;