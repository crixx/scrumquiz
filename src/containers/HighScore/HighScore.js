import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import CardText from 'material-ui/Card/CardText';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import HighScoreTable from "../../components/UI/Table/HighScoreTable"

class HighScore extends Component {

    componentDidMount() {
        this.props.onFetchHighScores("psm1");
    }

    render() {
        let highScoreCards = [];
        if (this.props.highscores) {
            highScoreCards = Object.keys(this.props.highscores).map((key, index) => {
                return (
                    <Card key={key} style={{ margin: "1em" }}>
                        <CardHeader
                            title="HighScore"
                            subtitle="Check whos the best"
                        />
                        <CardText>
                            <HighScoreTable loading={this.props.loading} highscores={this.props.highscores[key]} />
                        </CardText>
                    </Card>
                )
            })
        }

        return (
            <div>
                {highScoreCards}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        highscores: state.highScore.highscores,
        loading: state.highScore.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchHighScores: (name) => dispatch(actions.fetchHighScores(name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HighScore);