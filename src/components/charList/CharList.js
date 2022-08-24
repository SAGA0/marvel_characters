import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.onLoadbyScroll();
        this.onRequest();

    }

    componentWillUnmount() {
        this.onDeletebyScroll()
    }


    onLoadbyScroll = () => {
        window.addEventListener('scroll', this.scrollCatching);
    }

    onDeletebyScroll = () => {
        window.removeEventListener('scroll', this.scrollCatching);
    }


    scrollCatching = () => {
        let scrollHeight = Math.max(
            (document.documentElement.scrollHeight, document.body.scrollHeight)
        );
        if (Math.floor(window.scrollY + document.documentElement.clientHeight) >= scrollHeight) {
            this.onRequest(this.state.offset);
        }
    }


    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true
        }

        this.setState(({ offset, charList }) => ({

            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))

    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref)
    }

    updateAciveItm = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    renderItms(arr) {
        const items = arr.map((item, id) => {
            let imgStyle = { objectFit: 'cover' }
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { objectFit: 'contain' }
            }

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={this.setRef}
                    key={item.id}
                    onClick={
                        () => {
                            this.props.onCharSelected(item.id);
                            this.updateAciveItm(id)
                        }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.updateAciveItm(id);
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



    render() {
        const { error, loading, charList, offset, newItemLoading, charEnded } = this.state

        const items = this.renderItms(charList)

        const errorMsg = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error) ? items : null

        return (
            <div className="char__list" >
                {errorMsg}
                {spinner}
                {content}
                <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    onClick={() => { this.onRequest(offset) }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;