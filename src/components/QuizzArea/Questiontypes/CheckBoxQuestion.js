import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import classes from './CheckBoxQuestion.css';

const styles = {
  checkbox: {
    default: {
      marginBottom: 16
    },
    ok: {
      marginBottom: 16,
      border: "2px solid green"
    },
    nok: {
      marginBottom: 16,
      border: "2px solid salmon"
    }
  },
};

class CheckBoxQuestion extends React.Component {
  render() {
    const userAnswer = this.props.userAnswer || {};
    const questionState = this.props.questionState || {}
    const validate = questionState.validated || false;
    const disabled = questionState.disabled || false;


    let options = this.props.options.map((value) => {
      const optionState = userAnswer[value.answerTextId] || {}
      const checked = optionState.checked || false;
      const correct = optionState.correct || false;
      const style = validate ? (correct ? styles.checkbox.ok : styles.checkbox.nok) : styles.checkbox.default;

      return (
        <Checkbox
          key={value.answerTextId}
          label={value.answerTextText}
          style={style}
          checked={checked}
          onCheck={(event, isInputChecked) => {
            this.props.onInputCheck(event, isInputChecked, value.answerTextId)
          }}
          disabled={disabled}
        />
      )
    })

    const descriptionText = (<div>
      <p>{this.props.descriptionText}</p>
    </div>)

    return (
      <div>
        <p className={classes.QuestionTitle}>{this.props.questionText}</p>
        {options}
        {validate ? descriptionText : null}
      </div >
    );
  }
}

export default CheckBoxQuestion;