import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import { getLastURLPath } from "../utils";

import "../App.css";

import { API_GET_ANSWER_REQUEST } from "../actions/types";
import MainPage from "../components/MainPage";

class AnswerPage extends Component {
  componentWillMount() {
    const questionID = getLastURLPath(this.props.location.pathname);
    console.log(questionID);
    this.props.dispatch({ type: API_GET_ANSWER_REQUEST, questionID });
  }
  render() {
    const { answer, fetching, error } = this.props;
    let dataGraph = [];
    if (answer) {
      dataGraph = answer.answers.map(a => {
        return {
          name: a.value,
          numberAnswers: a.users.length,
        };
      });
    }

    const mainContent = answer && (
      <div>
        <div>
          <strong>Question: </strong> {answer.text}
        </div>
        <div
          style={{
            boxSizing: "border-box",
            padding: "10px",
            width: "800px",
            height: "800px",
            backgroundColor: "#fff"
          }}
        >
          <BarChart
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0
            }}
            width={750}
            height={300}
            data={dataGraph}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: "Résponse",
                position: "insideBottomRight",
                offset: 0
              }}
              height={100}
              angle={-30}
              textAnchor="end"
            />
            <YAxis
              label={{ value: "Answers", angle: -90, position: "insideLeft" }}
              width={100}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="numberAnswers" fill="#8884d8" />
          </BarChart>
        </div>
        {fetching && <span className="fa fa-spinner"> Fetching .... </span>}
        {error && (
          <p
            className="alert alert-danger"
            style={{ color: "red", marginTop: "10px" }}
          >
            something went wrong!
          </p>
        )}
      </div>
    );
    return <MainPage mainContent={mainContent} title="Answers" />;
  }
}

const mapStateToProps = state => ({
  questions: state.questions.questions,
  answer: state.answers.answers,
  fetching: state.answers.fetching,
  error: state.answers.error
});

export default connect(mapStateToProps)(AnswerPage);
