var React = require('react');

module.exports = spot = React.createClass({
  playSong: function(e, id) {
    $.each($('.audio'), function () {
        this.pause();
    });
    console.log('play');
    document.getElementById('song1').play()
  },
  render: function() {
    // var songNodes = this.props.songs.map(function(song) {
      // var songId = 'song' + song.id;
    //   this.playSong = function(e, id) {
    //     $.each($('.audio'), function () {
    //         this.pause();
    //     });
    //     console.log('play');
    //     document.getElementById(songId).play()
    //   };
    //   return (
    //     <tr key={songId}>
    //       <td><button className="btn btn-success btn-sm playBtn" onClick={this.playSong}><i className="fa fa-play" /></button></td>
    //       <td>{this.props.title}</td>
    //       <td className="hidden"><audio className="audio" id={songId} src={this.props.song} type="audio/wav"></audio></td>
    //     </tr>
    //   );
    // };
    return (
      <div className="col-xs-12">
        <h2><button className="btn btn-success btn-sm playBtn" onClick={this.playSong}><i className="fa fa-play" /></button>Spotify Sample</h2>
        <div className="hidden"><audio className="audio" id="song1" src={this.props.song} type="audio/wav"></audio></div>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td></td>
                <td className="hidden"><audio className="audio" id="song1" src={this.props.song} type="audio/wav"></audio></td>
              </tr>
            </tbody>
          </table>
      </div>
    );
  }
});
