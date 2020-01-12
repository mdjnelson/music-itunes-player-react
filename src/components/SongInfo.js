import React, { Component } from 'react'

class SongInfo extends Component {

    state = {
        song: this.props.song,
        songs: this.props.songs
    };

    handleOnClick(event, id, direction) {
        let newid = id;
        if (direction === 'previous' && id > 0) {
            newid = id - 1;
        } else if (direction === 'next') {
            newid = id + 1;
        }

        if (!this.props.songs[newid]) {
            return;
        }

        this.setState({
            song: this.props.songs[newid]
        });

        event.preventDefault();
    }

    render() {

        return (
            <div id="song-info">
                <div id="album-cover">
                    <img src={this.state.song.artworkUrl100} alt="Album cover" />
                </div>
                <div>
                    <strong>Artist name:</strong> {this.state.song.artistName}<br />
                    <strong>Track name:</strong> {this.state.song.trackName}<br />
                    <strong>Country:</strong> {this.state.song.country}<br />
                </div>
                <video controls>
                    <source src={this.state.song.previewUrl} />
                </video>
                <div id="song-navigation">
                    <button id="previous" onClick={event => this.handleOnClick(event, this.state.song.id, 'previous')}> ← Previous </button>
                    <button id="next" onClick={event => this.handleOnClick(event, this.state.song.id, 'next')}>Next → </button>
                </div>
            </div>
        )
    }
}

export default SongInfo
