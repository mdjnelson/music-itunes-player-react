import React, { Component } from 'react'
import SongList from "./SongList";
import './Search.scss';

class Search extends Component {

    state = {
        searchValue: '',
        songs: []
    };

    handleOnChange(event) {
        this.setState({
            searchValue: event.target.value
        });
    };

    handleOnClick(event) {
        const itunesUrl = "https://itunes.apple.com/search?term=";
        const term = this.state.searchValue;

        fetch(itunesUrl + term)
        .then(results => {
            return results.json();
        })
        .then(data => {
            this.setState({
                songs: data
            });
        });

        event.preventDefault();
    }

    render() {
        return (
            <div id="search-box">
                <input
                    name="text"
                    type="text"
                    placeholder="Search"
                    onChange={event => this.handleOnChange(event)}
                    value={this.state.searchValue}
                />
                <button onClick={event => this.handleOnClick(event)}>Search</button>
                <SongList songs={this.state.songs} />
            </div>
        )
    }
}

export default Search
