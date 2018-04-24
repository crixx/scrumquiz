import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui';
import { firebaseToArray } from "../../../shared/utility"
import Spinner from '../Spinner/Spinner';

const highScoreTable = (props) => {
    let tableBodyElements = []
    if (props.highscores) {
        const flatArray = firebaseToArray(props.highscores, (key, elem) => {
            return {
                ...elem,
                key: key
            }
        })

        //const sortAscending = (a, b) => a.score - b.score;
        const sortDescending = (a, b) => b.score - a.score;

        flatArray.sort(sortDescending);

        const highscores = props.maxRows < flatArray.length ? flatArray.slice(0, props.maxRows) : flatArray
        tableBodyElements = highscores.map((elem) => {
            const date = new Date(elem.date).toLocaleDateString("de-de");
            return (
                <TableRow key={elem.key}>
                    <TableRowColumn>{elem.score}</TableRowColumn>
                    <TableRowColumn>{elem.name}</TableRowColumn>
                    <TableRowColumn>{date}</TableRowColumn>
                </TableRow>
            );
        })
    }

    let table;
    if (props.loading) {
        table = <Spinner />;
    }
    else {
        table = (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Score</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {tableBodyElements}
                </TableBody>
            </Table>
        )
    }
    return table;
};


export default highScoreTable;