var React = require('react');
var Link = require('react-router').Link;
var NavLink = require('./navlink.react');
var Events = require('./events.react');
var browserHistory = require('react-router').browserHistory;

module.exports = app = React.createClass({
  getInitialState: function() {
    return {events: ''};
  },
  // componentDidMount: function() {
  //   console.log(this.refs);
  //   var x = this.refs.foo.showEvents();
  // },
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});
