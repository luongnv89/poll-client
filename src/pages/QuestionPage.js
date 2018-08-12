import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "../App.css";

import {
  API_GET_QUESTION_REQUEST,
  API_SUBMIT_ANSWER_REQUEST
} from "../actions/types";
import MainPage from "../components/MainPage";
import Question from "../components/Question";
import { getUID, getLastURLPath } from "../utils";

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = { answers: [] };
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.onSubmitAnswer = this.onSubmitAnswer.bind(this);
  }
  componentWillMount() {
    const questionID = getLastURLPath(this.props.location.pathname);
    this.props.dispatch({ type: API_GET_QUESTION_REQUEST, questionID });
  }

  onSelectAnswer(answer) {
    console.log("answer, ", answer);
    if (this.props.questions.type === 0) {
      // multiple option
      if (this.state.answers.indexOf(answer) === -1) {
        this.setState((prevState, props) => ({
          answers: prevState.answers.concat(answer)
        }));
      } else {
        this.setState((prevState, props) => ({
          answers: prevState.answers.filter(a => a !== answer)
        }));
      }
    } else {
      this.setState({ answers: [answer] });
    }
  }

  onSubmitAnswer() {
    console.log("Going to submit answer: ", this.state.answers);
    const answerData = {
      userID: getUID(),
      questionID: this.props.questions.id,
      answers: this.state.answers
    };
    this.props.dispatch({
      type: API_SUBMIT_ANSWER_REQUEST,
      payload: answerData
    });
  }

  render() {
    const { questions, fetching, error } = this.props;

    const mainContent = (
      <div className="App">
        {questions && (
          <Question
            question={questions}
            enableSubmit={true}
            onSubmitAnswer={this.onSubmitAnswer}
            onSelectAnswer={this.onSelectAnswer}
            answers={this.state.answers}
          />
        )}
        {fetching && <span className="fa fa-spinner"> Fetching .... </span>}
        {error && (
          <p
            className="alert alert-danger"
            style={{ color: "red", marginTop: "10px" }}
          >
            {" "}
            something went wrong!{" "}
          </p>
        )}
      </div>
    );
    return this.props.redirectToAnswer ? (
      <Redirect to={`/answers/questions/${questions.id}`} />
    ) : (
      <MainPage mainContent={mainContent} title="Questions" />
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions.questions,
  fetching: state.questions.fetching,
  error: state.questions.error,
  redirectToAnswer: state.questions.redirectToAnswer
});

export default connect(mapStateToProps)(QuestionPage);
