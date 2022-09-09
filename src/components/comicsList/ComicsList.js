import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setcomicsEnded] = useState(false)

    const { loading, error, getAllComics } = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics < 8) {
            ended = true
        }

        setComicsList(comicsList => [...comicsList, ...newComics])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 8)
        setcomicsEnded(comicsEnded => ended)

    }

    function renderComics(arr) {
        const items = arr.map((item, id) => {
            let imgStyle = { objectFit: 'cover' }
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { objectFit: 'contain' }
            }

            return (
                <li className="comics__item" key={id}>
                    <a href="#">
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )

        })
        return (
            <ul className="comics__grid" >
                {items}
            </ul>
        )
    }

    const items = renderComics(comicsList)

    const errorMsg = error ? <ErrorMessage /> : null
    const spinner = loading && !newItemLoading ? <Spinner /> : null



    return (
        <div className="comics__list" >
            {errorMsg}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => { onRequest(offset) }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;