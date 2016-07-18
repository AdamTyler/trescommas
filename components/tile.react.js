var React = require('react');
var Link = require('react-router').Link;

module.exports = tile = React.createClass({
  handleClick: function(e) {
  	console.log(e);
  },
  componentDidMount: function() {
  },
  render: function() {
    var imgUrl = this.props.img;
    var thumbStyle = {
      background: 'url(' + imgUrl + ') center'
    };
    return (
      <div className="col-xs-12 col-sm-3 col-md-3">
        <Link to={"/event/"+this.props.id}
        className="btn btn-primary btn-lg btn-block thumbnail"
        style={thumbStyle}
        onClick={this.handleClick}>
          <div className="overlay">
            <div className="caption">
              <h4>{this.props.title}</h4>
              <span>{this.props.venue}</span>
              <span>{this.props.time}</span>
            </div>
          </div>
        </Link>
      </div>
    )
  }
});
