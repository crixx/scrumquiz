import React, { Component } from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import psm1image from '../../assets/images/PSM1.png';
import HighScoreTable from '../../components/UI/Table/HighScoreTable';
import Aux from '../../hoc/Aux/Aux';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

const style = {
    card: {
        margin: 10
    }
}
export class Home extends Component {

    state = {
        checked: false,
    }
    componentDidMount() {
        this.props.onFetchHighScores("psm1");
    }

    render() {
        return (
            <Aux>
                <Card style={style.card}>
                    <CardTitle title="Scrum Training" subtitle="Professional Scrum Master 1" >
                        <Checkbox
                            style={{ position: "absolute", top: 25, width: "auto", right: 5 }}
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                        />
                    </CardTitle>
                    <CardMedia style={{ textAlign: "center" }}>
                        <img src={psm1image} alt="psm1" style={{ maxHeight: 150, minWidth: "auto", width: "auto" }} />
                    </CardMedia>
                    <CardText>
                        Check your knowledge about Scrum and prepare for the "Professional Scrum Master" certifiaction at scrum.org.
                </CardText>
                    <CardActions>
                        <Link to="/psm1"> <RaisedButton fullWidth={true} primary label="Start Quiz" /></Link>
                    </CardActions>
                </Card>

                <Card style={style.card}>
                    <CardTitle title="Scrum Training Top 3" subtitle="Professional Scrum Master 1" >
                        <Checkbox
                            style={{ position: "absolute", top: 25, width: "auto", right: 5 }}
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                        />
                    </CardTitle>
                    <CardText>
                        <HighScoreTable highscores={this.props.highscores.psm1} loading={this.props.loading} maxRows={3} />
                    </CardText>
                    <CardActions>
                        <Link to="/highscore"> <RaisedButton fullWidth={true} primary label="Checkout whos the best" /></Link>
                    </CardActions>
                </Card>
            </Aux>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);