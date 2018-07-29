import React from 'react';
import { connect } from 'react-redux';

import '../App.css';

import { API_CALL_REQUEST } from '../actions/types';
import MainPage from '../components/MainPage';

const Question = ({ question }) => {
  console.log('answers: ', question.answers);
  let listAnswers = null;
  if (question.type === 0) {
    listAnswers = (<div>{question.answers.map((a) => <div><input type="checkbox" value={a} name="answer" /> { a } <br /> </div>)}</div>);
  } else {
    listAnswers = (
      <div>
        <span>{question.answers.min}</span>
        <input type="range" min={question.answers.min} max={question.answers.max} value={(question.answers.min + question.answers.max) / 2} className="slider" id="answer" />
        <span>{question.answers.max}</span>
      </div>
    );
  }
  return (
    <div>
      <p> {question.text} </p>
      {listAnswers}
    </div>
  );
};

const AnswerPage = ({
  fetching, questions, onRequestQuestions, error,
}) => {
  let listQuestions = null;
  if (questions) {
    console.log('questions: ', questions);
    listQuestions = questions.map((q) => <Question key={q.id} question={q} />);
  } else {
    listQuestions = <span>There is no data!</span>;
  }
  const mainContent = (
    <div className="App">
      {listQuestions}
      {fetching ? (
        <button disabled> Fetching .... </button>
      ) : (
        <button onClick={onRequestQuestions}> Request list questions </button>
      )}
      {error && <p style={{ color: 'red' }}> something went wrong! </p>}
    </div>
  );

  return <MainPage mainContent={mainContent} title="Answer" />;
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  fetching: state.questions.fetching,
  error: state.questions.error,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestQuestions: () => dispatch({ type: API_CALL_REQUEST }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnswerPage);
