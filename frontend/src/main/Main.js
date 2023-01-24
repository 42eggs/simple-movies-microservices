import React, {useEffect, useState} from 'react';

const Main = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        (
            async () => {
                const response= await fetch('http://localhost:8001/api/movies')
                const data = await response.json()
                setMovies(data)
            }

        )()
    }, [])

    const likeMovie = async(id) => {
        await fetch(`http://localhost:8001/api/movies/${id}/like`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })

        setMovies(movies.map(
            (movie) => {
                if(movie.id==id)
                    movie.id++
                return movie
            }
        ))

    }

    return (
        <main>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {movies.map((movie) => {
                            return (
                                <div className="col" key={movie.id}>
                                    <div className="card shadow-sm">
                                        <img src={movie.image} height='180'/>
                                        <div className="card-body">
                                            <p className="card-text">{movie.title}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button"
                                                            className="btn btn-sm btn-outline-secondary"
                                                    onClick={()=> likeMovie(movie.id)}
                                                    >Like
                                                    </button>
                                                </div>
                                                <small className="text-muted">{movie.likes} likes</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;