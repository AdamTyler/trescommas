var React = require('react');
var browserHistory = require('react-router').browserHistory;

module.exports = cityForm = React.createClass({
  getInitialState: function() {
    return {city: 'Austin, TX', date: Date.now()};
  },
  handleTextChange: function(e) {
    this.setState({city: e.target.value});
  },
  getCityState: function(str) {
    str = str.trim();
    var comma = str.indexOf(',');
    return [str.slice(0, comma), str.substring(comma +2)]
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var citystate = this.getCityState(this.state.city);
    browserHistory.push('/events/' + citystate[0] + '/' + citystate[1] + '/' + this.state.date);
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="topRow col-xs-12 col-md-offset-3 col-md-6">
            <h1 className="hTitle text-danger">,,,</h1>
            <p>Events, Concerts, Arts, Etc.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-offset-3 col-md-6">
          <h1 className="cityForm">Where are you going?</h1>
            <div className="form-group">
              <form className="cityForm" onSubmit={this.handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  value={this.state.city}
                  onChange={this.handleTextChange}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
