import React, { Component } from "react";
import "../styles/font-roboto.css";
import "../styles/material-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Slider from '@material-ui/core/Slide';

const questionImageStyle = {
  height: "100%",
  width: "100%"
};

const QuestionVideo = ({ videoURL }) => (
  <div style={{ height: "400px" }}>
    <video style={{ height: "400px" }} src={videoURL} controls />
  </div>
);

const QuestionImage = ({ images }) => (
  <div className="row">
    {images.map((img, index) => (
      <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
        <img src={img} style={questionImageStyle} />
      </div>
    ))}
  </div>
);

const AnswersMultiOptions = ({ options, answers, onSelectAnswer }) => (
  <div className="list-group">
    {options.map(a => (
      /* eslint jsx-a11y/anchor-is-valid:0 */
      <a
        href="/#"
        style={{ marginTop: "5px", marginBottom: "5px" }}
        key={a}
        className={
          answers.indexOf(a) > -1 ? "list-group-item active" : "list-group-item"
        }
        value={a}
        onClick={e => {
          e.preventDefault();
          onSelectAnswer(a);
        }}
      >
        {a}
      </a>
    ))}
  </div>
);

const AnswersSlider = ({
  min,
  max,
  step,
  currentValue,
  handleChangeHorizontal
}) => (
  <Slider
    min={min}
    max={max}
    step={step}
    value={currentValue}
    labels={{ min: "Min", max: "Max" }}
    onChange={handleChangeHorizontal}
  />
);

const AnswersRange = ({ min, max, step, currentValue }) => (
  <select>
    {Array(Math.floor((max - min) / step))
      .fill(null)
      .map(
        index =>
          currentValue === min + index * step ? (
            <option value={min + index * step} selected>
              {min + index * step}
            </option>
          ) : (
            <option value={min + index * step}>{min + index * step}</option>
          )
      )}
  </select>
);

class Question extends Component {
  render() {
    const { question, answers, enableSubmit, onSubmitAnswer, onSelectAnswer } = this.props;
    return (
      <div>
        <div>
          <strong>Question </strong>
          <div className="well well-lg">{question.text}</div>
        </div>
        {question.video && <QuestionVideo videoURL={question.video} />}
        {question.images &&
          question.images.length > 0 && (
            <QuestionImage images={question.images} />
          )}
        <br />
        {question.type === 0 && (
          <AnswersMultiOptions
            options={question.answers}
            answers={answers}
            onSelectAnswer = {onSelectAnswer}
          />
        )}
        {question.type === 1 && (
          <AnswersSlider
            min={question.answers.min}
            max={question.answers.max}
            step={question.answers.step}
            currentValue={
              answers.length === 0
                ? question.answers.min
                : answers[0]
            }
            onSelectAnswer = {onSelectAnswer}
          />
        )}
        {question.type === 2 && (
          <AnswersRange
            min={question.answers.min}
            max={question.answers.max}
            step={question.answers.step}
            currentValue={
              answers.length === 0
                ? question.answers.min
                : answers[0]
            }
            onSelectAnswer = {onSelectAnswer}
          />
        )}
        {enableSubmit && (
          <button className="btn btn-success" onClick={onSubmitAnswer}>
            Submit
          </button>
        )}
      </div>
    );
  }
}

export default Question;
