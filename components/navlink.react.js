var React = require('react');
var Link = require('react-router').Link;

module.exports = navlink = React.createClass({
  render: function() {
    return <Link {...this.props} activeClassName="active"/>
  }
});
