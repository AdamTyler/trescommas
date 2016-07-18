var React = require('react');

module.exports = map = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="centered-pills">
          <ul className="nav nav-pills">
            <li><a href=""><i className="fa fa-list"/> List</a></li>
            <li className="active"><a href="/map"><i className="fa fa-map"/> Map</a></li>
          </ul>
        </div>
        <div className="row">
          <img src="/images/map.png" />
        </div>
      </div>
    );
  }
});
