var React = require('react');
var Spotify = require('./spotify.react');

module.exports = event = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      time: '',
      imgurl: '',
      venue: '',
      state: '',
      url: '',
      previewurl: ''
    }
    console.log('events getinit', this.props.params);
  },
  componentDidMount: function() {
    // console.log('events did moutn', this.props);
    $.ajax({
      url: '/api/event/' + this.props.params.eventId,
      dataType: 'json',
      success: function(data) {
        // console.log('get init data', data);
        this.setState(data);
        console.log(this.state);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    // var songs = [{id: 1, title: "blah", src: "https://p.scdn.co/mp3-preview/85a79cc59a4a82de2eb72a28b46a3b1fa457eb71"}, {id: 2, title: 'who', src: "https://p.scdn.co/mp3-preview/85a79cc59a4a82de2eb72a28b46a3b1fa457eb71"}, {id: 3, title: 'cares', src: "https://p.scdn.co/mp3-preview/85a79cc59a4a82de2eb72a28b46a3b1fa457eb71"}]
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2">
            <img src={this.state.imgurl} className="artistImage" />
            <img src="/images/tile.png" />
          </div>
          <div className="col-xs-10">
            <h1>{this.state.name}</h1>
            <p>{this.state.venue}</p>
            <p>{this.state.time}</p>
            <p>{this.state.city}, {this.state.state}</p>
            <a href={this.state.url}>Tickets</a>
          </div>
        </div>
        <div className="row">
          <Spotify song={this.state.previewurl}/>
        </div>
      </div>
    )
  }
});
