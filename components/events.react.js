var React = require('react');
var Link = require('react-router').Link;
var NavLink = require('./navlink.react');
var Tile = require('./tile.react');

module.exports = events = React.createClass({
  // showEvents: function(events) {
  //   console.log(events);
  // },
  getInitialState: function() {
    return {
      city: '',
      events: []
    }
    console.log('events getinit', this.props.params);
  },
  componentDidMount: function() {
    // console.log('events did moutn', this.props);
    $.ajax({
      url: '/api/events/' + this.props.params.city + '/' + this.props.params.state + '/' + this.props.params.date,
      dataType: 'json',
      success: function(data) {
        // console.log('get init data', data);
        this.setState({city: data.city, events: data.events});
        // console.log(this.state);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  },
  getDate: function() {
    // console.log(new Date(this.props.params.date.toString())
    return new Date().toDateString();
  },
  render: function() {
    var eventNodes = this.state.events.map(function(event) {
      return (
        <Tile title={event.name} time={event.time} venue={event.venue} key={event.id} img={event.imgurl} id={event.id}/>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="topRow col-xs-12">
            <h1>{this.state.city.name}, {this.state.city.state} <small>{this.getDate()} - {new Date(2016, 4, 21).toDateString()}</small></h1>
          </div>
        </div>
        <div className="row">
          <div className="centered-pills">
            <ul className="nav nav-pills">
              <li className="active"><a href="#"><i className="fa fa-list"/> List</a></li>
              <li><a href="/map"><i className="fa fa-map"/> Map</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          {eventNodes}
        </div>
      </div>
    );
  }
});
