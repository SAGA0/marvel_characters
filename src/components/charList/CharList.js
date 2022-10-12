import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
            break;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />
            break;
        case 'confirmed':
            return <Component />
            break;
        case 'error':
            return <ErrorMessage />
            break
        default:
            throw new Error('Unexpecting data')

    }

}


const CharList = (props) => {


    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)


    const { getAllCharacters, clearError, process, setProcess } = useMarvelService()



    useEffect(() => {
        onRequest(offset, true)
    }, [])


    // componentWillUnmount() {
    //     this.onDeletebyScroll()
    // }


    // onLoadbyScroll = () => {
    //     window.addEventListener('scroll', this.scrollCatching);
    // }

    // onDeletebyScroll = () => {
    //     window.removeEventListener('scroll', this.scrollCatching);
    // }


    // scrollCatching = () => {
    //     let scrollHeight = Math.max(
    //         (document.documentElement.scrollHeight, document.body.scrollHeight)
    //     );
    //     if (Math.floor(window.scrollY + document.documentElement.clientHeight) >= scrollHeight) {
    //         onRequest(offset);
    //     }
    // }


    const onRequest = (offset, initial) => {
        clearError()
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }


    const onCharListLoaded = async (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)

    }


    const itemRefs = useRef([]);


    const updateAciveItm = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItms(arr) {
        const items = arr.map((item, id) => {
            let imgStyle = { objectFit: 'cover' }
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { objectFit: 'contain' }
            }

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[id] = el}
                    key={item.id}
                    onClick={
                        () => {
                            props.onCharSelected(item.id);
                            updateAciveItm(id)
                        }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            updateAciveItm(id);
                        }
                    }}>
                    <img src={item.thumbnail} style={imgStyle} alt="abyss" />
                    <div className="char__name">{item.name}</div>
                </li>
            )

        })
        return (
            <ul className="char__grid" >
                {items}
            </ul>
        )
    }



    return (
        <div className="char__list" >
            {setContent(process, () => renderItms(charList), newItemLoading)}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => { onRequest(offset) }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;