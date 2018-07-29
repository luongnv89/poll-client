import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLastURLPath } from '../utils';

import '../App.css';

import { API_GET_ANSWER_REQUEST } from '../actions/types';
import MainPage from '../components/MainPage';

class AnswerPage extends Component {
  componentWillMount() {
    const questionID = getLastURLPath(this.props.location.pathname);
    this.props.dispatch({ type: API_GET_ANSWER_REQUEST, questionID });
  }
  render() {
    const { answers, fetching, error } = this.props;
    const mainContent = (
      <div className="App">
        {answers && (
          <div>
            <p style={{ marginBottom: '10px' }}> {answers.length} </p>
          </div>
        )}
        {fetching && <span className="fa fa-spinner"> Fetching .... </span>}
        {error && (
          <p className="alert alert-danger" style={{ color: 'red', marginTop: '10px' }}>
            {' '}
            something went wrong!{' '}
          </p>
        )}
      </div>
    );
    return (<MainPage mainContent={mainContent} title="Answers" />);
  }
}

const mapStateToProps = (state) => ({
  answers: state.answers.answers,
  fetching: state.answers.fetching,
  error: state.answers.error,
});

export default connect(mapStateToProps)(AnswerPage);
