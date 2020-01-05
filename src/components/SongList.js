import React, { Component } from 'react'

class SongList extends Component {

    render() {

        function formatReleaseDate(dategiven)
        {
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

        }

        function formatSongLength(songLength)
        {
            let minutes = Math.floor(songLength / 60000);
            let seconds = ((songLength % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

        const hasSongs = this.props.songs.resultCount > 0;
        return (
            <div className="SongList">
            {hasSongs ? (
            <table>
                <tr>
                    <th>Artist</th>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Release date</th>
                    <th>Thumbnail</th>
                    <th>Song length</th>
                    <th>Genre</th>
                    <th>Price</th>
                </tr>
                {this.props.songs.results.map((song) => {
                    return (
                        <tr className="SongRow">
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
                                {formatReleaseDate(song.releaseDate)}
                            </td>
                            <td>
                                <img src={song.artworkUrl30} />
                            </td>
                            <td>
                                {formatSongLength(song.trackTimeMillis)}
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
            </table>
            ) : (
                <p>No songs founds! :(</p>
            )}
            </div>
        );
    }
}

export default SongList