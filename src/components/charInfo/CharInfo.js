import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'


const CharInfo = (props) => {


    const [char, setChar] = useState(null)
    const { loading, error, getCharacter, clearError } = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [props.charId])


    const updateChar = () => {
        clearError()
        const { charId } = props
        if (!charId) {
            return
        }

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }



    const skeleton = error || char || loading ? null : <Skeleton />
    const errorMsg = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null
    return (
        <div className="char__info">
            {skeleton}
            {errorMsg}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char

    let imgStyle = { objectFit: 'cover' }
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'contain' }
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={imgStyle} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.lenght > 0 ? null : 'This character doesn`t have comics for now '}
                {
                    comics.map((item, i) => {
                        if (i > 9) return
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )

                    })
                }

            </ul>
        </>
    )

}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;