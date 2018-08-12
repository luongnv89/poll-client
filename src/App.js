import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import store from './store';
import QuestionPage from './pages/QuestionPage';
import HomePage from './pages/HomePage';
import AnswerPage from './pages/AnswerPage';
import ErrorBoundary from './components/ErrorBoudary';

/* eslint react/prefer-stateless-function:0 */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/questions/:questionID" component={QuestionPage} />
          <Route path="/answers/questions/:questionID" component={AnswerPage} />
        </div>
      </Router>
    );
  }
}

if (document.getElementById('root')) {
  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>,
    document.getElementById('root'),
  );
}

export default App;
