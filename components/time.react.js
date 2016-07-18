var React = require('react');

module.exports = time = React.createClass({
  render: function() {
    return (
      <h1>
        {this.props.date}
      </h1>
    );
  }
});
