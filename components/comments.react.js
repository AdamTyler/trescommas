var React = require('react');
var Time = require('./time.react');

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getCurrentTime: function() {
    var date = new Date(Date.now());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var returnedHours = hours;
    if (hours === 0) { returnedHours += 12; }
    else if (hours > 12) { returnedHours -= 12; }
    var returnedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // return returnedHours + ':' + returnedMinutes + ':' + seconds;
    this.setState({time: returnedHours + ':' + returnedMinutes + ':' + seconds});
  },
  getInitialState: function() {
    return {data: [], time: '00:00:00'};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    setInterval(this.getCurrentTime, 1000);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <Time date={this.state.time} />
      </div>
    );
  }
});

module.exports = CommentBox;
