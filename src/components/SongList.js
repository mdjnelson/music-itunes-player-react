import React, { Component } from 'react'

class SongList extends Component {

    state = {
        sort: '',
        dir: ''
    };

    formatReleaseDate = dategiven => {
        let date = new Date(dategiven);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return dt + '-' + month + '-' + year;
    };

    formatSongLength = songLength => {
        let minutes = Math.floor(songLength / 60000);
        let seconds = ((songLength % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    handleSortingList = (event, type) => {
        let sort = type;
        let dir = 'asc';

        if (this.state.sort === type) {
            if (this.state.dir === 'asc') {
                dir = 'desc'
            } else {
                dir = 'asc'
            }
        }

        this.setState({
            sort: sort,
            dir: dir
        });
    };

    compareInts = (a, b, dir) => {
        if (dir === 'asc') {
            return a - b;
        }
        return b - a;
    };

    compareAlpha = (a, b, dir) => {
        if (dir === 'asc') {
            if (a > b) {
                return -1;
            }
            if (b > a) {
                return 1;
            }
            return 0;
        } else {
            if (a < b) {
                return -1;
            }
            if (b < a) {
                return 1;
            }
            return 0;
        }
    };

    sortSongs = (songs, sort, dir) => {
        if (!songs) {
            return [];
        }

        const copy = songs.slice();
        copy.sort((song1, song2) => {
            if (sort === 'primaryGenreName') {
                return this.compareAlpha(song1[sort], song2[sort], dir);
            }
            return this.compareInts(song1[sort], song2[sort], dir);
        });

        return copy;
    };

    render() {
        const sortedSongs = this.sortSongs(this.props.songs.results, this.state.sort, this.state.dir);
        const hasSongs = this.props.songs.resultCount > 0;

        return (
            <div>
            {hasSongs && !this.state.showInfo && (
                <div id="song-list">
                <table>
                    <thead>
                        <tr>
                            <th>Artist</th>
                            <th>Title</th>
                            <th>Album</th>
                            <th>Release date</th>
                            <th>Thumbnail</th>
                            <th className="sortable-column" onClick={event => this.handleSortingList(event, 'trackTimeMillis')}>Song length</th>
                            <th className="sortable-column" onClick={event => this.handleSortingList(event, 'primaryGenreName')}>Genre</th>
                            <th className="sortable-column" onClick={event => this.handleSortingList(event, 'trackPrice')}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sortedSongs.map((song, index) => {
                        song.id = index;
                        return (
                            <tr className="song-row" id={song.id} onClick={event => this.props.viewSongInfo(event, song)}>
                                <td>
                                    {song.artistName}
                                </td>
                                <td>
                                    {song.trackName}
                                </td>
                                <td>
                                    {song.collectionName}
                                </td>
                                <td>
                                    {this.formatReleaseDate(song.releaseDate)}
                                </td>
                                <td>
                                    <img src={song.artworkUrl30} alt="Album"/>
                                </td>
                                <td>
                                    {this.formatSongLength(song.trackTimeMillis)}
                                </td>
                                <td>
                                    {song.primaryGenreName}
                                </td>
                                <td>
                                    {song.trackPrice} {song.currency}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>
            )}
            {!hasSongs && this.props.searchValue && (
                <div id="no-songs">No songs found :(</div>
            )}
            </div>

        );
    }
}

export default SongList