import React, {useEffect, useState} from 'react';
import Wrapper from "./Wrapper";
import {Link} from "react-router-dom";

const Movies = () => {

    const [movies, setMovies] = useState([])

    const updateMovies = async () => {
        const response = await fetch('http://localhost:8000/api/movies')
        const data = await response.json()
        setMovies(data)
    }

    useEffect(() => {

        (async () => {
            await updateMovies()
        })()


    }, [])


    const delMovie = async (id) => {
        if(window.confirm(`Are you sure you want to delete Movie ID #${id}?`)) {
            await fetch(`http://localhost:8000/api/movies/${id}`, {method: 'DELETE'})
            await updateMovies()
        }

    }

    const updateMovie = async (id) => {
        if(window.confirm(`Are you sure you want to delete Movie ID #${id}?`)) {
            await fetch(`http://localhost:8000/api/movies/${id}`, {method: 'DELETE'})
            await updateMovies()
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to='/admin/movies/create' className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Likes</th>
                  <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {movies.map(movie => {
                    return(
                        <tr key={movie.id}>
                          <td>{movie.id}</td>
                          <td><img src={movie.image} height="100"/></td>
                          <td>{movie.title}</td>
                          <td>{movie.likes}</td>
                          <td>
                              <div className="btn-group mr-2" role="group" aria-label="Basic example">
                                  <Link to={`/admin/movies/${movie.id}/update`} type="button" className="btn btn-primary">Update</Link>
                                  <button type="button" className="btn btn-danger"
                                  onClick={()=>delMovie(movie.id)}>Delete</button>
                              </div>
                          </td>
                        </tr>
                    )
                })}

                </tbody>
              </table>
            </div>
        </Wrapper>

    );
};

export default Movies;