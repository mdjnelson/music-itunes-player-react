import React, { Component } from 'react'
import SongList from "./SongList";
import SongInfo from "./SongInfo";
import './Search.scss';

class Search extends Component {

    state = {
        searchValue: '',
        songs: '',
        songSelected: '',
        showInfo: false
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
                songs: data,
                showInfo: false
            });
        });

        event.preventDefault();
    }

    viewSongInfo = (event, song) => {
        this.setState({
            showInfo: true,
            songSelected: song
        })
    };

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
                {this.state.songs && !this.state.showInfo &&
                    <SongList
                        songs={this.state.songs}
                        viewSongInfo={this.viewSongInfo.bind(this)}
                        searchValue={this.state.searchValue}
                    />
                }
                {this.state.showInfo &&
                    <SongInfo
                        song={this.state.songSelected}
                        songs={this.state.songs.results}
                    />
                }
            </div>
        )
    }
}

export default Search
