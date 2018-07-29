import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import '../App.css';

import { API_CALL_REQUEST, API_SUBMIT_ANSWER_REQUEST } from '../actions/types';
import MainPage from '../components/MainPage';
import { getUID } from '../utils';

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = { answers: [] };
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.onSubmitAnswer = this.onSubmitAnswer.bind(this);
  }
  componentWillMount() {
    const questionID = 'q2';
    this.props.dispatch({ type: API_CALL_REQUEST, questionID });
  }

  onSelectAnswer(answer) {
    console.log('answer, ', answer);
    if (this.state.answers.indexOf(answer) === -1) {
      this.setState((prevState, props) => ({
        answers: prevState.answers.concat(answer),
      }));
    } else {
      this.setState((prevState, props) => ({
        answers: prevState.answers.filter((a) => a !== answer),
      }));
    }
  }

  onSubmitAnswer() {
    console.log('Going to submit answer: ', this.state.answers);
    const answerData = {
      userID: getUID(),
      questionID: this.props.questions.id,
      answers: this.state.answers,
    };
    this.props.dispatch({ type: API_SUBMIT_ANSWER_REQUEST, payload: answerData });
  }

  render() {
    if (this.state.redirectToAnswer) {
      return (<Redirect to='/#/answers' />);
    }
    const { questions, fetching, error } = this.props;
    let listAnswers = null;
    if (questions) {
      if (questions.type === 0) {
        listAnswers = (
          <div className="list-group">
            {questions.answers.map((a) => (
              /* eslint jsx-a11y/anchor-is-valid:0 */
              <a
                href="/#"
                style={{ marginTop: '5px', marginBottom: '5px' }}
                key={a}
                className={
                  this.state.answers.indexOf(a) > -1 ? 'list-group-item active' : 'list-group-item'
                }
                value={a}
                onClick={(e) => {
                  e.preventDefault();
                  this.onSelectAnswer(a);
                }}
              >
                {a}
              </a>
            ))}
          </div>
        );
      } else {
        listAnswers = (
          <div>
            <span>{questions.answers.min}</span>
            <input
              type="range"
              min={questions.answers.min}
              max={questions.answers.max}
              value={(questions.answers.min + questions.answers.max) / 2}
              className="slider"
              id="answer"
            />
            <span>{questions.answers.max}</span>
          </div>
        );
      }
    }

    const mainContent = (
      <div className="App">
        {questions && (
          <div>
            <p style={{ marginBottom: '10px' }}> {questions.text} </p>
            {listAnswers}
            <button className="btn btn-success" onClick={this.onSubmitAnswer}>
              Submit
            </button>
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
    return <MainPage mainContent={mainContent} title="Questions" />;
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  fetching: state.questions.fetching,
  error: state.questions.error,
  redirectToAnswer: state.questions.redirectToAnswer,
});

export default connect(mapStateToProps)(QuestionPage);
