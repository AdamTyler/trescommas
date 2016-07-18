var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var City = require('./components/city.react');
var App = require('./components/app.react');
var Events = require('./components/events.react');
var Event = require('./components/event.react');
var Venues = require('./components/venues.react');
var Map = require('./components/map.react');


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={City}/>
      <Route path='/events/:city/:state/:date' component={Events} />
      <Route path='/event/:eventId' component={Event}/>
      <Route path="/venues" component={Venues}/>
      <Route path="/map" component={Map}/>
    </Route>
  </Router>,
  document.getElementById('app')
)
