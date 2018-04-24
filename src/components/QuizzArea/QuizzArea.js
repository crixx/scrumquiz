import React from 'react';
import CheckBoxQuestion from './Questiontypes/CheckBoxQuestion';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { withRouter } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Aux from "../../hoc/Aux/Aux"

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Modal from '../UI/Modal/Modal';
import { TextField } from 'material-ui';

const back = <FontIcon className="material-icons">keyboard_arrow_left</FontIcon>;
const next = <FontIcon className="material-icons">keyboard_arrow_right</FontIcon>;
const check = <FontIcon className="material-icons">check_circle</FontIcon>;
const finish = <FontIcon className="material-icons">send</FontIcon>;



const styles = {
    button: {
        margin: 12,
    },
    card: {
        margin: 20,
        marginBottom: 76
    },
    bottomNavigation: {
        margin: 0,
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%"
    },
    activeButton: {
        color: "green"
    }
};

class QuizzArea extends React.Component {




    state = {
        counter: 0,
        finish: false,
        showNext: false,
        startTime: undefined,
        options: {
            "psm1_5": [
                {
                    "answerTextId": "1",
                    "answerTextText": "Empiricism",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Common sense",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Empirical criticism",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Kanban system",
                    "correct": 0
                }
            ],
            "psm1_7": [
                {
                    "answerTextId": "1",
                    "answerTextText": "As soon as possible to minimize further deviation",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "After Scrum Master approval",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The deviations should be discussed at the Daily Scrum and then an adjustment must be made",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "After clarifying all the details with the Product Owner",
                    "correct": 0
                }
            ],
            "psm1_9": [
                {
                    "answerTextId": "2",
                    "answerTextText": "It should have all competencies needed to accomplish the work without depending on others  not part of the team",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "It should use tools, processes and techniques approved by the Organization",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "It should choose how best to accomplish their work, rather than being directed by others  outside the team",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "It should be flexible enough to complete all the work planned for the Sprint even if some  team members are on vacation",
                    "correct": 0
                }
            ],
            "psm1_11": [
                {
                    "answerTextId": "3",
                    "answerTextText": "The Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Product Owner",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Key Stakeholders",
                    "correct": 0
                }
            ],
            "psm1_13": [
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 1
                }
            ],
            "psm1_17": [
                {
                    "answerTextId": "1",
                    "answerTextText": "The Scrum Master",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Development Team",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Owner",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Key Stakeholders",
                    "correct": 0
                }
            ],
            "psm1_18": [
                {
                    "answerTextId": "2",
                    "answerTextText": "2 teams of 6 and 4 people (because it is good to have all the QAs in a separate team)",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "1 team of 10 people (because there is no reason to divide)",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "2 teams of 6 and 4 people (the professionals after a short meeting decided this is the best  variant)",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "3 teams of 4, 3 and 3 people (each team is cross-functional)",
                    "correct": 1
                }
            ],
            "psm1_19": [
                {
                    "answerTextId": "1",
                    "answerTextText": "True",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "False",
                    "correct": 1
                }
            ],
            "psm1_23": [
                {
                    "answerTextText": ""
                },
                {
                    "answerTextText": ""
                },
                {
                    "answerTextText": ""
                },
                {
                    "answerTextText": ""
                }
            ],
            "psm1_24": [
                {
                    "answerTextId": "3",
                    "answerTextText": "3 hours or less",
                    "correct": 2
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "15 minutes",
                    "correct": 0
                },
                {
                    "answerTextId": "0",
                    "answerTextText": "8 hours or less"
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "4 hours or less",
                    "correct": 3
                }
            ],
            "psm1_27": [
                {
                    "answerTextId": "3",
                    "answerTextText": "Scope may be clarified and re-negotiated between the Product Owner and Development Team  as more is learned",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Sprint scope is defined at the Sprint Planning and cannot be changed",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Quality goals do not decrease",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Sprint Goal is changed frequently to reflect the status of the remaining work",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "No changes are made that would endanger the Sprint Goal",
                    "correct": 1
                }
            ],
            "psm1_28": [
                {
                    "answerTextId": "3",
                    "answerTextText": "The Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Key Stakeholders",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Owner",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Product Owner and the Scrum Master",
                    "correct": 0
                }
            ],
            "psm1_30": [
                {
                    "answerTextId": "3",
                    "answerTextText": "The Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Sprint Backlog",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Sprint Goal",
                    "correct": 1
                }
            ],
            "psm1_33": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Not more than 8 hours",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "As much as it is necessary to make task break-down and estimations for all items in the  Sprint Backlog",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Not more than 4 hours",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "From 4 to 8 hours",
                    "correct": 0
                }
            ],
            "psm1_34": [
                {
                    "answerTextId": "2",
                    "answerTextText": "How will the work needed to deliver the Increment be achieved?",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "What is the size of the Technical Debt and how it could be removed?",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Who will be responsible for each item in the Sprint Backlog?",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "What can be delivered in the Increment resulting from the upcoming Sprint?",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "What new technologies could be used to speed up the Development Team velocity?",
                    "correct": 0
                }
            ],
            "psm1_36": [
                {
                    "answerTextId": "3",
                    "answerTextText": "Flexibility",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Responsibility",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Creativity",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Productivity",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Agility",
                    "correct": 0
                },
                {
                    "answerTextId": "6",
                    "answerTextText": "Competence",
                    "correct": 0
                }
            ],
            "psm1_37": [
                {
                    "answerTextId": "1",
                    "answerTextText": "Accountability belongs to the Development Team as a whole",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Scrum recognizes no sub-teams in the Development Team",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Scrum recognizes no titles for Development Team members other than Developer",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Having at least one test engineer in the Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Having the Scrum Master as a part-time Developer in the Development Team",
                    "correct": 0
                }
            ],
            "psm1_42": [
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 1
                }
            ],
            "psm1_47": [
                {
                    "answerTextId": "4",
                    "answerTextText": "Enforces the rule that only Development Team members participate in the Daily Scrum",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Is responsible for conducting the Daily Scrum",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Teaches the Development Team to keep the Daily Scrum within the 15-minute time-box",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Ensures that the Development Team has the meeting",
                    "correct": 1
                }
            ],
            "psm1_48": [
                {
                    "answerTextId": "3",
                    "answerTextText": "Common understanding of progress toward the Sprint Goal and how progress is trending toward  completing the work in the Sprint Backlog",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "A list of improvements that the Scrum Team will implement in the next Sprint",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "A revised Product Backlog that defines the probable Product Backlog items for the next Sprint",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Common understanding of what can be delivered in the Increment and how will the work needed  to deliver the Increment be achieved",
                    "correct": 0
                }
            ],
            "psm1_49": [
                {
                    "answerTextId": "1",
                    "answerTextText": "The Scrum Master",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Owner",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Development Team",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Key Stakeholders",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Organization CEO",
                    "correct": 0
                }
            ],
            "psm1_50": [
                {
                    "answerTextId": "1",
                    "answerTextText": "It is an opportunity for the Scrum Team to inspect itself and create a plan for improvements  to be enacted during the next Sprint",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "It is a meeting where the Development Team synchronizes activities and creates a plan for  the next 24 hours",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "It is a meeting to inspect the Increment and adapt the Product Backlog if needed",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "It is the key inspect and adapt meeting",
                    "correct": 0
                }
            ],
            "psm1_52": [
                {
                    "answerTextId": "1",
                    "answerTextText": "Inspect how the last Sprint went with regards to people, relationships, process, and tools",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Get feedback from the Key Stakeholders invited by the Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Identify and order the major items that went well and potential improvements",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Get technical or domain advice from specialists invited by The Development Team or The Scrum  Master",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Create a plan for implementing improvements to the way the Scrum Team does its work",
                    "correct": 1
                }
            ],
            "psm1_54": [
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Owner and The Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Scrum Master and The Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Product Owner",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "6",
                    "answerTextText": "The Scrum Team",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                }
            ],
            "psm1_55": [
                {
                    "answerTextId": "4",
                    "answerTextText": "The list of removed impediments",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Product Backlog",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Sprint Backlog",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Increment",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Sprint Goal",
                    "correct": 0
                }
            ],
            "psm1_56": [
                {
                    "answerTextId": "2",
                    "answerTextText": "The CEO of the Organization",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Product Backlog",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Key Stakeholders",
                    "correct": 0
                }
            ],
            "psm1_57": [
                {
                    "answerTextId": "4",
                    "answerTextText": "The Product Owner and The Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Owner and The Scrum Master",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Product Owner",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Scrum Master and The Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                },
                {
                    "answerTextId": "6",
                    "answerTextText": "The Development Team",
                    "correct": 0
                }
            ],
            "psm1_58": [
                {
                    "answerTextId": "2",
                    "answerTextText": "It is dynamic",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "It is never complete",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "As long as a product exists, its Product Backlog also exists",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "A Product Backlog could be closed when it contains no items to include into the next Sprint",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "When the final version of a product is rolled out, its Product Backlog is dismissed",
                    "correct": 0
                }
            ],
            "psm1_59": [
                {
                    "answerTextId": "2",
                    "answerTextText": "False",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "True",
                    "correct": 1
                }
            ],
            "psm1_60": [
                {
                    "answerTextId": "3",
                    "answerTextText": "The Scrum Team",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                },
                {
                    "answerTextId": "6",
                    "answerTextText": "The Scrum Master and the Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Product owner and the Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Development Team",
                    "correct": 1
                },
                {
                    "answerTextId": "7",
                    "answerTextText": "The Product owner and the Scrum Master",
                    "correct": 0
                }
            ],
            "psm1_61": [
                {
                    "answerTextId": "1",
                    "answerTextText": "The Product Backlog items selected for this Sprint plus the plan for delivering them",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Backlog items selected for this Sprint",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Product Backlog items selected for this Sprint plus a set of Development Team internal  tasks",
                    "correct": 0
                }
            ],
            "psm1_63": [
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Backlog",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Sprint Backlog",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Increment",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Definition of Done",
                    "correct": 0
                }
            ],
            "psm1_64": [
                {
                    "answerTextId": "1",
                    "answerTextText": "The Development Team",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Scrum Team",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Product Owner and the Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Owner",
                    "correct": 0
                }
            ],
            "psm1_65": [
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Development Team and the Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Scrum Team",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Development Team",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                }
            ],
            "psm1_66": [
                {
                    "answerTextId": "3",
                    "answerTextText": "All \"Done\" items in the Sprint Backlog",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The sum of all the Product Backlog items completed during the Sprint and the value of the  increments of all previous Sprints",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The sum of all the Product Backlog items completed during the Sprint",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "All items in the Sprint Backlog that could be released regardless of whether the Product  Owner decides to actually do it",
                    "correct": 0
                }
            ],
            "psm1_67": [
                {
                    "answerTextId": "1",
                    "answerTextText": "The Development Team",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Development Team and The Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Scrum Team",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Product Owner",
                    "correct": 0
                }
            ],
            "psm1_69": [
                {
                    "answerTextId": "1",
                    "answerTextText": "True",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "False",
                    "correct": 1
                }
            ],
            "psm1_70": [
                {
                    "answerTextId": "2",
                    "answerTextText": "False",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "True",
                    "correct": 1
                }
            ],
            "psm1_71": [
                {
                    "answerTextId": "3",
                    "answerTextText": "Adaptation",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Inspection",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Agility",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Self-organization",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Transparency",
                    "correct": 1
                },
                {
                    "answerTextId": "6",
                    "answerTextText": "Cross-functionality",
                    "correct": 0
                }
            ],
            "psm1_76": [
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 0
                }
            ],
            "psm1_77": [
                {
                    "answerTextId": "2",
                    "answerTextText": "The Scrum Team",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Development Team",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Product Owner",
                    "correct": 0
                }
            ],
            "psm1_79": [
                {
                    "answerTextId": "1",
                    "answerTextText": "The Development Team",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Key Stakeholders",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                }
            ],
            "psm1_82": [
                {
                    "answerTextId": "2",
                    "answerTextText": "The evolution of the amount of uncertainty during a project",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "How much work remains till the end of the Sprint",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Dependencies, start times and stop times for project tasks",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Hierarchy of tasks that comprise a project",
                    "correct": 0
                }
            ],
            "psm1_85": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Less valuable and most unclear items at the bottom",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The recently added items at the top",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The less clear items at the top",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Alphabetical",
                    "correct": 0
                }
            ],
            "psm1_88": [
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 0
                }
            ],
            "psm1_209": [
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 1
                }
            ],
            "psm1_215": [
                {
                    "answerTextId": "1",
                    "answerTextText": "True",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "False",
                    "correct": 1
                }
            ],
            "psm1_221": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Coaching the Development Team in self-organization and cross-functionality",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Removing impediments to the Development Team's progress",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Helping the Development Team to create high-value products",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Adding or removing developers from the Development Team in accordance with team velocity  changes",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Helping the Development Team as the team leader",
                    "correct": 0
                }
            ],
            "psm1_223": [
                {
                    "answerTextId": "3",
                    "answerTextText": "How much is known about the Product over time",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Hierarchy of tasks that comprise a project",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "How much work remains till the end of the Sprint",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Dependencies, start times and stop times for project tasks",
                    "correct": 0
                }
            ],
            "psm1_224": [
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 0
                }
            ],
            "psm1_226": [
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Scrum Master",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Scrum Team",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Development Team",
                    "correct": 0
                }
            ],
            "psm1_227": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Not more than 20%",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Not more than 10%",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Development Team is not authorized for Product Backlog refinement",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Not more than 5%",
                    "correct": 0
                }
            ],
            "psm1_228": [
                {
                    "answerTextId": "2",
                    "answerTextText": "The Sprint Review",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Sprint Retrospective",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Sprint Planning",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Daily Scrum",
                    "correct": 0
                }
            ],
            "psm1_229": [
                {
                    "answerTextId": "1",
                    "answerTextText": "Product Value Maximizer",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Lead Scrum evangelist in the Organization",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Lead Facilitator of Key Stakeholder Involvement",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Product Marketplace Expert",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Facilitator of Scrum events",
                    "correct": 0
                }
            ],
            "psm1_230": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Definition of \"Done\" of other Scrum Teams working on the same Product",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Conventions, standards and guidelines of the Organization",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Advice of the Scrum Master",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Experience of the Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Definition of \"Done\" of other Scrum Teams working on other products",
                    "correct": 0
                }
            ],
            "psm1_242": [
                {
                    "answerTextId": "1",
                    "answerTextText": "True",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "False",
                    "correct": 0
                }
            ],
            "psm1_244": [
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 1
                }
            ],
            "psm1_246": [
                {
                    "answerTextId": "3",
                    "answerTextText": "The Sprint Planning",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Sprint Retrospective",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Daily Scrum",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Sprint Review",
                    "correct": 1
                }
            ],
            "psm1_247": [
                {
                    "answerTextId": "1",
                    "answerTextText": "A sequential design process, used in software development processes, in which progress is  seen as flowing steadily downwards.",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "A framework within which people can address complex adaptive problems, while delivering  valuable products.",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "A software development methodology which is intended to improve software quality.",
                    "correct": 0
                }
            ],
            "psm1_249": [
                {
                    "answerTextId": "2",
                    "answerTextText": "The Development Team, but with permission of the Product Owner",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Product Owner",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Key Stakeholders",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Anyone",
                    "correct": 0
                }
            ],
            "psm1_251": [
                {
                    "answerTextId": "4",
                    "answerTextText": "The Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Key Stakeholders",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Scrum Team",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Scrum Master",
                    "correct": 0
                }
            ],
            "psm1_253": [
                {
                    "answerTextId": "1",
                    "answerTextText": "Yes, if the remaining work is also estimated, maybe in bigger units",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "No, all items in the Sprint Backlog should be decomposed to units of one day or less by  the end of the Sprint Planning",
                    "correct": 0
                }
            ],
            "psm1_254": [
                {
                    "answerTextId": "3",
                    "answerTextText": "Projected capacity of the Development Team during the Sprint",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The latest product Increment",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Past performance of the Development Team",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Product Backlog",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Feedback from the Key Stakeholders",
                    "correct": 0
                },
                {
                    "answerTextId": "6",
                    "answerTextText": "Feedback from the Organization CEO",
                    "correct": 0
                }
            ],
            "psm1_255": [
                {
                    "answerTextId": "1",
                    "answerTextText": "The Product Owner",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Scrum Master",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Key Stakeholders",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Team Manager",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Development Team",
                    "correct": 1
                }
            ],
            "psm1_256": [
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 0
                }
            ],
            "psm1_259": [
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 0
                }
            ],
            "psm1_260": [
                {
                    "answerTextId": "2",
                    "answerTextText": "If part of the work is potentially releasable, the Product Owner typically accepts it",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Several top Product Backlog Items are taken into the Sprint Backlog to replace the obsolete  items",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Any completed and  “Done  Product Backlog items are reviewed",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "All incomplete Product Backlog Items are re-estimated and put back on the Product Backlog",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "At the Sprint Retrospective the Scrum Master determines who from the Development Team is  responsible for cancelling the Sprint",
                    "correct": 0
                }
            ],
            "psm1_263": [
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 0
                }
            ],
            "psm1_266": [
                {
                    "answerTextId": "2",
                    "answerTextText": "No",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Yes",
                    "correct": 0
                }
            ],
            "psm1_267": [
                {
                    "answerTextId": "2",
                    "answerTextText": "No",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Yes",
                    "correct": 1
                }
            ],
            "psm1_268": [
                {
                    "answerTextId": "3",
                    "answerTextText": "After the Daily Scrum",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "As frequently as possible",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "At the Sprint Review",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Frequently, but it should not get in the way of the work",
                    "correct": 1
                }
            ],
            "psm1_272": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Planning Scrum implementations within the organization",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Leading and coaching the organization in its Scrum adoption",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Working with other Scrum Masters to increase the effectiveness of the application of Scrum  in the organization",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Making sure the key stakeholders are invited on all Scrum Reviews within organization",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Mixing experienced developers and junior specialists across different Development Teams  in the organization to speed up Scrum adoption",
                    "correct": 0
                }
            ],
            "psm1_275": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Ensuring that the Product Backlog is visible, transparent, and clear to all, and shows what  the Scrum Team will work on next",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Ordering the items in the Product Backlog to best achieve goals and missions",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Moving Product Backlog items into the Sprint Backlog",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Optimizing the value of the work the Development Team performs",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Presenting Product Backlog items to the Key Stakeholders",
                    "correct": 0
                }
            ],
            "psm1_361": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Roles",
                    "correct": 1
                },
                {
                    "answerTextId": "6",
                    "answerTextText": "Rules",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Reports",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Events",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Burn-down charts",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Artifacts",
                    "correct": 1
                }
            ],
            "psm1_376": [
                {
                    "answerTextId": "3",
                    "answerTextText": "DoD ensures artifact transparency",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "DoD guides the Development Team in knowing how many Product Backlog items it can select  during a Sprint Planning",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "DoD helps in inspection and adaptation",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "DoD is used to assess when work is complete on the product Increment",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "DoD helps to calculate velocity of the Scrum Team",
                    "correct": 0
                }
            ],
            "psm1_377": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Product development, its releasing and sustaining",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Software and hardware development",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Research and identifying of viable markets, technologies, and Product capabilities",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Development of an operational environment for the Product",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Complex work that can include all the suggested options and even more",
                    "correct": 1
                }
            ],
            "psm1_378": [
                {
                    "answerTextId": "3",
                    "answerTextText": "Development of software and hardware",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Research and identifying of viable markets, technologies, and product capabilities",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Development and sustaining of Cloud and other operational environments",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Development of products and enhancements",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Managing the operation of an organization",
                    "correct": 1
                },
                {
                    "answerTextId": "6",
                    "answerTextText": "Development of almost everything we use in our daily lives as individuals and societies",
                    "correct": 1
                }
            ],
            "psm1_379": [
                {
                    "answerTextId": "3",
                    "answerTextText": "The Development Team",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Scrum Master and the Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Scrum Guide",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "A small team of people that is highly flexible and adaptive",
                    "correct": 1
                }
            ],
            "psm1_386": [
                {
                    "answerTextId": "2",
                    "answerTextText": "What will I do today to help the Development Team meet the Sprint Goal?",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Do I have complete understanding of the Sprint Backlog item I am working on?",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Do I see any impediment that prevents me or the Development Team from meeting the Sprint  Goal?",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "What did I do yesterday that helped the Development Team meet the Sprint Goal?",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Did I explain all the discovered issues I found yesterday to the Product Owner?",
                    "correct": 0
                }
            ],
            "psm1_388": [
                {
                    "answerTextId": "6",
                    "answerTextText": "Self-organization",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Focus",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Respect",
                    "correct": 1
                },
                {
                    "answerTextId": "7",
                    "answerTextText": "Effectiveness",
                    "correct": 0
                },
                {
                    "answerTextId": "8",
                    "answerTextText": "Agility",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Openness",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Commitment",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "Courage",
                    "correct": 1
                }
            ],
            "psm1_389": [
                {
                    "answerTextId": "1",
                    "answerTextText": "The Scrum Master",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "The Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Scrum Master and the Product Owner",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Scrum Team",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Development Team",
                    "correct": 0
                }
            ],
            "psm1_395": [
                {
                    "answerTextId": "2",
                    "answerTextText": "False",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "True",
                    "correct": 0
                }
            ],
            "psm1_396": [
                {
                    "answerTextId": "1",
                    "answerTextText": "False",
                    "correct": 1
                },
                {
                    "answerTextId": "2",
                    "answerTextText": "True",
                    "correct": 0
                }
            ],
            "psm1_397": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Make sure the Sprint Backlog for the next Sprint includes all the improvements.",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Make sure the Sprint Backlog for the next Sprint includes at least one high priority process  improvement.",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Assign responsible team members for every improvement. Check the progress at the next Retrospective.",
                    "correct": 0
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Assign a responsible team member for at least one improvement. Check the progress at the  next Retrospective.",
                    "correct": 0
                }
            ],
            "psm1_534": [
                {
                    "answerTextId": "2",
                    "answerTextText": "The Sprint Retrospective",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "The Sprint Review",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "The Sprint Planning",
                    "correct": 1
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "The Sprint",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "The Daily Scrum",
                    "correct": 1
                }
            ],
            "psm1_536": [
                {
                    "answerTextId": "2",
                    "answerTextText": "Finding techniques for effective Product Backlog management",
                    "correct": 1
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "Facilitating Scrum events as requested or needed",
                    "correct": 1
                },
                {
                    "answerTextId": "3",
                    "answerTextText": "Understanding product planning in an empirical environment",
                    "correct": 1
                },
                {
                    "answerTextId": "4",
                    "answerTextText": "Introducing cutting edge development practices",
                    "correct": 0
                },
                {
                    "answerTextId": "5",
                    "answerTextText": "Leading and coaching the organization in its Scrum adoption",
                    "correct": 0
                }
            ],
            "psm1_540": [
                {
                    "answerTextId": "2",
                    "answerTextText": "False",
                    "correct": 0
                },
                {
                    "answerTextId": "1",
                    "answerTextText": "True",
                    "correct": 1
                }
            ]
        }, questions: [
            {
                "id": "psm1_5",
                "questionText": "Scrum is founded on",
                "catId": 2,
                "points": 1,
                "responseDescription": "Scrum is founded on empirical process control theory, or empiricism. Empiricism asserts that knowledge  comes from experience and making decisions based on what is known.Scrum is founded on empirical process control theory, or empiricism. Empiricism asserts that knowledge  comes from experience and making decisions based on what is known.",
                "type": "single"
            },
            {
                "id": "psm1_7",
                "questionText": "If an inspector determines that one or more aspects of a process deviate outside acceptable limits  when an adjustment must be made?",
                "catId": 2,
                "points": 1,
                "responseDescription": "If an inspector determines that one or more aspects of a process deviate outside acceptable limits,  and that the resulting product will be unacceptable, the process or the material being processed  must be adjusted. An adjustment must be made as soon as possible to minimize further deviation.If an inspector determines that one or more aspects of a process deviate outside acceptable limits,  and that the resulting product will be unacceptable, the process or the material being processed  must be adjusted. An adjustment must be made as soon as possible to minimize further deviation.",
                "type": "single"
            },
            {
                "id": "psm1_9",
                "questionText": "What are the two essential features a Scrum Team should possess?",
                "catId": 3,
                "points": 1,
                "responseDescription": "Scrum Teams are self-organizing and cross-functional. Self-organizing teams choose how best to accomplish  their work, rather than being directed by others outside the team. Cross-functional teams have  all competencies needed to accomplish the work without depending on others not part of the team.Scrum Teams are self-organizing and cross-functional. Self-organizing teams choose how best to accomplish  their work, rather than being directed by others outside the team. Cross-functional teams have  all competencies needed to accomplish the work without depending on others not part of the team.",
                "type": "multiple"
            },
            {
                "id": "psm1_11",
                "questionText": "Who is responsible for managing the Product Backlog?",
                "catId": 3,
                "points": 1,
                "responseDescription": "The Product Owner is the sole person responsible for managing the Product Backlog.The Product Owner is the sole person responsible for managing the Product Backlog.",
                "type": "multiple"
            },
            {
                "id": "psm1_13",
                "questionText": "It is a good practice  to have at least two Product Owners on big projects.",
                "catId": 3,
                "points": 1,
                "responseDescription": "The Product Owner is one person, not a committee, but  the Product Owner may represent the desires  of a committee in the Product Backlog.The Product Owner is one person, not a committee, but  the Product Owner may represent the desires  of a committee in the Product Backlog.",
                "type": "single"
            },
            {
                "id": "psm1_17",
                "questionText": "The Scrum Team consists of",
                "catId": 3,
                "points": 1,
                "responseDescription": "The Scrum Team consists of a Product Owner, the Development Team, and a Scrum Master.The Scrum Team consists of a Product Owner, the Development Team, and a Scrum Master.",
                "type": "multiple"
            },
            {
                "id": "psm1_18",
                "questionText": "Imagine you are a Scrum Master. There are 10 professionals (developers and QAs) and the  Product  Owner. How to distribute people between development teams? Choose all applicable variants:",
                "catId": 3,
                "points": 1,
                "responseDescription": "Optimal Development Team size is small enough to remain nimble and large enough to complete significant  work within a Sprint. Fewer than three Development Team members decrease interaction and results  in smaller productivity gains. Having more than nine members requires too much coordination.  The Product Owner and Scrum Master roles are not included in this count unless they are also  executing the work of the Sprint Backlog.Number of people in a Development Team should be between 3 and 9. Each team should be cross-functional  and self-organized.Optimal Development Team size is small enough to remain nimble and large enough to complete significant  work within a Sprint. Fewer than three Development Team members decrease interaction and results  in smaller productivity gains. Having more than nine members requires too much coordination.  The Product Owner and Scrum Master roles are not included in this count unless they are also  executing the work of the Sprint Backlog.  ",
                "type": "multiple"
            },
            {
                "id": "psm1_19",
                "questionText": "The Scrum Master is focused primarily on the Scrum Team and usually does not care about those outside  the Scrum Team.",
                "catId": 3,
                "points": 1,
                "responseDescription": "The Scrum Master is a servant-leader for the Scrum Team. The Scrum Master helps those outside the  Scrum Team understand which of their interactions with the Scrum Team are helpful and which aren¢â‚¬â„¢t.  The Scrum Master helps everyone change these interactions to maximize the value created by the  Scrum Team.The Scrum Master is a servant-leader for the Scrum Team. The Scrum Master helps those outside the  Scrum Team understand which of their interactions with the Scrum Team are helpful and which aren¢â‚¬â„¢t.  The Scrum Master helps everyone change these interactions to maximize the value created by the  Scrum Team.",
                "type": "single"
            },
            {
                "id": "psm1_23",
                "questionText": "Sort Scrum events in the right order.",
                "catId": 8,
                "points": 1,
                "responseDescription": "A sprint begins with Sprint Planning, then there are several Daily Scrum meetings following by Sprint  Review and then Sprint Retrospective.A sprint begins with Sprint Planning, then there are several Daily Scrum meetings following by Sprint  Review and then Sprint Retrospective.",
                "type": "sort_answer"
            },
            {
                "id": "psm1_24",
                "questionText": "Please, select a time-box for each Scrum event.",
                "catId": 8,
                "points": 1,
                "responseDescription": "",
                "type": "matrix_sort_answer"
            },
            {
                "id": "psm1_27",
                "questionText": "  What happens during the Sprint? Select three answers.  ",
                "catId": 8,
                "points": 1,
                "responseDescription": "During the Sprint:During the Sprint:",
                "type": "multiple"
            },
            {
                "id": "psm1_28",
                "questionText": "Who has the authority to cancel the Sprint?",
                "catId": 8,
                "points": 1,
                "responseDescription": "Only the Product Owner has the authority to cancel the Sprint, although he or she may do so under  influence from the stakeholders, the Development Team, or the Scrum Master.Only the Product Owner has the authority to cancel the Sprint, although he or she may do so under  influence from the stakeholders, the Development Team, or the Scrum Master.",
                "type": "single"
            },
            {
                "id": "psm1_30",
                "questionText": "What provides guidance to the Development Team on why it is building the Increment?",
                "catId": 8,
                "points": 1,
                "responseDescription": "The Sprint Goal is an objective set for the Sprint that can be met through the implementation of  Product Backlog. It provides guidance to the Development Team on why it is building the Increment.The Sprint Goal is an objective set for the Sprint that can be met through the implementation of  Product Backlog. It provides guidance to the Development Team on why it is building the Increment.",
                "type": "single"
            },
            {
                "id": "psm1_33",
                "questionText": "How much time does  the Sprint Planning take?",
                "catId": 8,
                "points": 1,
                "responseDescription": "Sprint Planning is time-boxed to a maximum of eight hours for a one-month Sprint.Sprint Planning is time-boxed to a maximum of eight hours for a one-month Sprint.",
                "type": "single"
            },
            {
                "id": "psm1_34",
                "questionText": "What are the questions the Sprint Planning answers? Select two.",
                "catId": 8,
                "points": 1,
                "responseDescription": "Sprint Planning answers the following:Sprint Planning answers the following:",
                "type": "multiple"
            },
            {
                "id": "psm1_36",
                "questionText": "What are the three main qualities the team model in Scrum is designed to optimize?",
                "catId": 3,
                "points": 1,
                "responseDescription": "The team model in Scrum is designed to optimize flexibility, creativity, and productivity.The team model in Scrum is designed to optimize flexibility, creativity, and productivity.",
                "type": "multiple"
            },
            {
                "id": "psm1_37",
                "questionText": "What are the characteristics of a Development Team? Select three most appropriate choices.",
                "catId": 3,
                "points": 1,
                "responseDescription": "Development Teams have the following characteristics:Development Teams have the following characteristics:",
                "type": "multiple"
            },
            {
                "id": "psm1_42",
                "questionText": "The Daily Scrum time-box depends on the size of the Development team.",
                "catId": 8,
                "points": 1,
                "responseDescription": "The Daily Scrum is a 15-minute time-boxed event for the Development Team of any size.The Daily Scrum is a 15-minute time-boxed event for the Development Team of any size.",
                "type": "single"
            },
            {
                "id": "psm1_47",
                "questionText": "The Scrum Master does the following regarding the Daily Scrum (select all applicable variants):",
                "catId": 3,
                "points": 1,
                "responseDescription": "The Scrum MasterThe Scrum Master",
                "type": "multiple"
            },
            {
                "id": "psm1_48",
                "questionText": "What is the result of the Sprint Review?",
                "catId": 8,
                "points": 1,
                "responseDescription": "The result of the Sprint Review is a revised Product Backlog that defines the probable Product Backlog  items for the next Sprint. The Product Backlog may also be adjusted overall to meet new opportunities.The result of the Sprint Review is a revised Product Backlog that defines the probable Product Backlog  items for the next Sprint. The Product Backlog may also be adjusted overall to meet new opportunities.",
                "type": "single"
            },
            {
                "id": "psm1_49",
                "questionText": "Who participates in the Sprint Review? Select all applicable variants.",
                "catId": 8,
                "points": 1,
                "responseDescription": "During the Sprint Review, the Scrum Team and stakeholders collaborate about what was done in the  Sprint. Based on that and any changes to the Product Backlog during the Sprint, attendees collaborate  on the next things that could be done to optimize value.During the Sprint Review, the Scrum Team and stakeholders collaborate about what was done in the  Sprint. Based on that and any changes to the Product Backlog during the Sprint, attendees collaborate  on the next things that could be done to optimize value.",
                "type": "multiple"
            },
            {
                "id": "psm1_50",
                "questionText": "What is the Sprint Retrospective?",
                "catId": 8,
                "points": 1,
                "responseDescription": "The Sprint Retrospective is an opportunity for the Scrum Team to inspect itself and create a plan  for improvements to be enacted during the next Sprint.The Sprint Retrospective is an opportunity for the Scrum Team to inspect itself and create a plan  for improvements to be enacted during the next Sprint.",
                "type": "single"
            },
            {
                "id": "psm1_52",
                "questionText": "The purpose of the Sprint Retrospective is to (select three):",
                "catId": 8,
                "points": 1,
                "responseDescription": "The purpose of the Sprint Retrospective is to:The purpose of the Sprint Retrospective is to:",
                "type": "multiple"
            },
            {
                "id": "psm1_54",
                "questionText": "Who is responsible for the monitoring of the remaining work towards the Project Goal?",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Product Owner tracks total work remaining at least every Sprint Review. The Product Owner compares  this amount with work remaining at previous Sprint Reviews to assess progress toward completing  projected work by the desired time for the goal. This information is made transparent to all  stakeholders.  The Product Owner tracks total work remaining at least every Sprint Review. The Product Owner compares  this amount with work remaining at previous Sprint Reviews to assess progress toward completing  projected work by the desired time for the goal. This information is made transparent to all  stakeholders.  ",
                "type": "single"
            },
            {
                "id": "psm1_55",
                "questionText": "What are the Scrum Artifacts? Select all applicable items.",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Scrum artifacts are Product Backlog, Sprint Backlog and Increment.The Scrum artifacts are Product Backlog, Sprint Backlog and Increment.",
                "type": "multiple"
            },
            {
                "id": "psm1_56",
                "questionText": "What could be a  source of requirements for any changes to be made to the product?",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Product Backlog is an ordered list of everything that might be needed in the product and is the  single source of requirements for any changes to be made to the product.The Product Backlog is an ordered list of everything that might be needed in the product and is the  single source of requirements for any changes to be made to the product.",
                "type": "multiple"
            },
            {
                "id": "psm1_57",
                "questionText": "Who is responsible for the Product Backlog?",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Product Owner is responsible for the Product Backlog, including its content, availability, and  ordering.  The Product Owner is responsible for the Product Backlog, including its content, availability, and  ordering.  ",
                "type": "single"
            },
            {
                "id": "psm1_58",
                "questionText": "What are Product Backlog features? Select three.",
                "catId": 9,
                "points": 1,
                "responseDescription": "A Product Backlog is never complete. The earliest development of it only lays out the initially known  and best-understood requirements. The Product Backlog evolves as the product and the environment  in which it will be used evolves. The Product Backlog is dynamic; it constantly changes to identify  what the product needs to be appropriate, competitive, and useful. As long as a product exists,  its Product Backlog also exists.A Product Backlog is never complete. The earliest development of it only lays out the initially known  and best-understood requirements. The Product Backlog evolves as the product and the environment  in which it will be used evolves. The Product Backlog is dynamic; it constantly changes to identify  what the product needs to be appropriate, competitive, and useful. As long as a product exists,  its Product Backlog also exists.",
                "type": "multiple"
            },
            {
                "id": "psm1_59",
                "questionText": "All Development Teams working on the same Product should use the same Product Backlog.",
                "catId": 9,
                "points": 1,
                "responseDescription": "Multiple Scrum Teams often work together on the same product. One Product Backlog is used to describe  the upcoming work on the product.Multiple Scrum Teams often work together on the same product. One Product Backlog is used to describe  the upcoming work on the product.",
                "type": "single"
            },
            {
                "id": "psm1_60",
                "questionText": "Who is responsible for all estimates in the Product Backlog?",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Development Team is responsible for all estimates in the Product Backlog.  The Product Owner  may influence the Development Team by helping it understand and select trade-offs, but the people  who will perform the work make the final estimate.The Development Team is responsible for all estimates in the Product Backlog.  The Product Owner  may influence the Development Team by helping it understand and select trade-offs, but the people  who will perform the work make the final estimate.",
                "type": "single"
            },
            {
                "id": "psm1_61",
                "questionText": "What is the Sprint Backlog?",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Sprint Backlog is the set of Product Backlog items selected for the Sprint, plus a plan for delivering  the product Increment and realizing the Sprint Goal.The Sprint Backlog is the set of Product Backlog items selected for the Sprint, plus a plan for delivering  the product Increment and realizing the Sprint Goal.",
                "type": "single"
            },
            {
                "id": "psm1_63",
                "questionText": "What belongs solely to the Development Team?",
                "catId": 9,
                "points": 1,
                "responseDescription": "Only the Development Team can change its Sprint Backlog during a Sprint. The Sprint Backlog is a  highly visible, real-time picture of the work that the Development Team plans to accomplish during  the Sprint, and it belongs solely to the Development Team.Only the Development Team can change its Sprint Backlog during a Sprint. The Sprint Backlog is a  highly visible, real-time picture of the work that the Development Team plans to accomplish during  the Sprint, and it belongs solely to the Development Team.",
                "type": "multiple"
            },
            {
                "id": "psm1_64",
                "questionText": "Who is responsible for tracking  the total work remaining in the Sprint Backlog  to project  the likelihood of achieving the Sprint Goal?",
                "catId": 9,
                "points": 1,
                "responseDescription": "At any point in time in a Sprint, the total work remaining in the Sprint Backlog can be summed. The  Development Team tracks this total work remaining at least for every Daily Scrum to project the  likelihood of achieving the Sprint Goal. By tracking the remaining work throughout the Sprint,  the Development Team can manage its progress.At any point in time in a Sprint, the total work remaining in the Sprint Backlog can be summed. The  Development Team tracks this total work remaining at least for every Daily Scrum to project the  likelihood of achieving the Sprint Goal. By tracking the remaining work throughout the Sprint,  the Development Team can manage its progress.",
                "type": "single"
            },
            {
                "id": "psm1_65",
                "questionText": "Who is allowed to change the Sprint Backlog during the Sprint?",
                "catId": 9,
                "points": 1,
                "responseDescription": "Only the Development Team can change its Sprint Backlog during a Sprint. The Sprint Backlog is a  highly visible, real-time picture of the work that the Development Team plans to accomplish during  the Sprint, and it belongs solely to the Development Team.  Only the Development Team can change its Sprint Backlog during a Sprint. The Sprint Backlog is a  highly visible, real-time picture of the work that the Development Team plans to accomplish during  the Sprint, and it belongs solely to the Development Team.  ",
                "type": "single"
            },
            {
                "id": "psm1_66",
                "questionText": "What is the Increment?",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Increment is the sum of all the Product Backlog items completed during the  Sprint  and the value of the increments of all previous Sprints.The Increment is the sum of all the Product Backlog items completed during the  Sprint  and the value of the increments of all previous Sprints.",
                "type": "single"
            },
            {
                "id": "psm1_67",
                "questionText": "Who creates the increment?",
                "catId": 9,
                "points": 1,
                "responseDescription": "Only members of the Development Team create the Increment.Only members of the Development Team create the Increment.",
                "type": "single"
            },
            {
                "id": "psm1_69",
                "questionText": "Scrum recommends  using  only those Scrum components and rules which suit most for a particular  project.  ",
                "catId": 2,
                "points": 1,
                "responseDescription": "Each component within the Scrum framework serves a specific purpose and is essential to Scrum's success  and usage.Each component within the Scrum framework serves a specific purpose and is essential to Scrum's success  and usage.",
                "type": "single"
            },
            {
                "id": "psm1_70",
                "questionText": "Scrum does not describe agile processes and techniques.",
                "catId": 2,
                "points": 1,
                "responseDescription": "Scrum is not a process or a technique for building products; rather, it is a framework within which  you can employ various processes and techniques.Scrum is not a process or a technique for building products; rather, it is a framework within which  you can employ various processes and techniques.",
                "type": "single"
            },
            {
                "id": "psm1_71",
                "questionText": "What are the three pillars that uphold Scrum?",
                "catId": 2,
                "points": 1,
                "responseDescription": "Scrum is founded on empirical process control theory, or empiricism. Empiricism asserts that knowledge  comes from experience and making decisions based on what is known. Three pillars uphold every  implementation of empirical process control: transparency, inspection, and adaptation.Scrum is founded on empirical process control theory, or empiricism. Empiricism asserts that knowledge  comes from experience and making decisions based on what is known. Three pillars uphold every  implementation of empirical process control: transparency, inspection, and adaptation.",
                "type": "multiple"
            },
            {
                "id": "psm1_76",
                "questionText": "Definition of  “Done  is created during the first Sprint and remains unchanged until the Product release.",
                "catId": 2,
                "points": 1,
                "responseDescription": "False.‚ During each Sprint Retrospective, the Scrum Team plans ways to increase product quality  by adapting the definition of  “Done  as appropriate.False.‚ During each Sprint Retrospective, the Scrum Team plans ways to increase product quality  by adapting the definition of  “Done  as appropriate.",
                "type": "single"
            },
            {
                "id": "psm1_77",
                "questionText": "Who is responsible for creation of the Definition of  “Done ?",
                "catId": 2,
                "points": 1,
                "responseDescription": "If the definition of  “done  for an increment is part of the conventions, standards or guidelines  of the development organization, all Scrum Teams must follow it as a minimum. If  “done  for an  increment is not a convention of the development organization, the Development Team of the Scrum  Team must define a definition of  “done  appropriate for the product. If there are multiple Scrum  Teams working on the system or product release, the development teams on all of the Scrum Teams  must mutually define the definition of  “Done. If the definition of  “done  for an increment is part of the conventions, standards or guidelines  of the development organization, all Scrum Teams must follow it as a minimum. If  “done  for an  increment is not a convention of the development organization, the Development Team of the Scrum  Team must define a definition of  “done  appropriate for the product. If there are multiple Scrum  Teams working on the system or product release, the development teams on all of the Scrum Teams  must mutually define the definition of  “Done. ",
                "type": "single"
            },
            {
                "id": "psm1_79",
                "questionText": "Who is allowed to participate in the Daily Scrum?",
                "catId": 8,
                "points": 1,
                "responseDescription": "The Scrum Master enforces the rule that only Development Team members participate in the Daily Scrum.  Other people could attend the meeting, but cannot participate.The Scrum Master enforces the rule that only Development Team members participate in the Daily Scrum.  Other people could attend the meeting, but cannot participate.",
                "type": "multiple"
            },
            {
                "id": "psm1_82",
                "questionText": "What does Burn-down Chart show?",
                "catId": 2,
                "points": 1,
                "responseDescription": "Burn-down chart  shows  the evolution of remaining effort against time.Burn-down chart  shows  the evolution of remaining effort against time.",
                "type": "single"
            },
            {
                "id": "psm1_85",
                "questionText": "What is the order of items in the Product Backlog?",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Product Owner is responsible for placing the most valuable and clear items at the top of the  Product Backlog.The Product Owner is responsible for placing the most valuable and clear items at the top of the  Product Backlog.",
                "type": "single"
            },
            {
                "id": "psm1_88",
                "questionText": "All the Scrum Teams  working on the same product should have the same Sprint length.",
                "catId": 2,
                "points": 1,
                "responseDescription": "False. Scrum does not require having aligned Sprints for multiple teams.False. Scrum does not require having aligned Sprints for multiple teams.",
                "type": "single"
            },
            {
                "id": "psm1_209",
                "questionText": "  It is a good practice  to have from time to time  a special technical Sprint that consists  only of tasks  removing the technical debt without implementing any new functionality.  ",
                "catId": 2,
                "points": 1,
                "responseDescription": "It is prohibited. The purpose of each Sprint is to deliver Increments of potentially releasable functionality  that adhere to the Scrum Team's current definition of  “Done. It is prohibited. The purpose of each Sprint is to deliver Increments of potentially releasable functionality  that adhere to the Scrum Team's current definition of  “Done. ",
                "type": "single"
            },
            {
                "id": "psm1_215",
                "questionText": "Scrum does not allow additional meetings that are not defined in Scrum.",
                "catId": 8,
                "points": 1,
                "responseDescription": "Scrum allows additional meetings if they facilitate achieving the Sprint Goal.Scrum allows additional meetings if they facilitate achieving the Sprint Goal.",
                "type": "single"
            },
            {
                "id": "psm1_221",
                "questionText": "How does the Scrum Master serve the Development Team? Select the three most appropriate answers.",
                "catId": 3,
                "points": 1,
                "responseDescription": "The Scrum Master serves the Development Team in several ways, including:The Scrum Master serves the Development Team in several ways, including:",
                "type": "multiple"
            },
            {
                "id": "psm1_223",
                "questionText": "What does Cone of Uncertainty show?",
                "catId": 2,
                "points": 1,
                "responseDescription": "The Cone of Uncertainty describes the evolution of the amount of uncertainty during a project.The Cone of Uncertainty describes the evolution of the amount of uncertainty during a project.",
                "type": "single"
            },
            {
                "id": "psm1_224",
                "questionText": "If an item in the Sprint Backlog cannot be finished by the end of the Sprint (it turned out there  is a lot more work to do than was estimated), the Sprint is cancelled.",
                "catId": 2,
                "points": 1,
                "responseDescription": "The Sprint is cancelled only in the case if the Sprint Goal became obsolete. If some work could not  be done, the Sprint Backlog  should be  re-negotiated between the Product Owner and Development  Team.  The Sprint is cancelled only in the case if the Sprint Goal became obsolete. If some work could not  be done, the Sprint Backlog  should be  re-negotiated between the Product Owner and Development  Team.  ",
                "type": "single"
            },
            {
                "id": "psm1_226",
                "questionText": "Who is responsible for coping with incomplete artifact transparency?",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Scrum Master's job is to work with the Scrum Team and the organization to increase the transparency  of the artifacts. This work usually involves learning, convincing, and change.The Scrum Master's job is to work with the Scrum Team and the organization to increase the transparency  of the artifacts. This work usually involves learning, convincing, and change.",
                "type": "single"
            },
            {
                "id": "psm1_227",
                "questionText": "What part of the capacity of the Development Team does Product Backlog refinement usually consume?",
                "catId": 9,
                "points": 1,
                "responseDescription": "Product Backlog refinement usually consumes no more than 10% of the capacity of the Development Team.Product Backlog refinement usually consumes no more than 10% of the capacity of the Development Team.",
                "type": "single"
            },
            {
                "id": "psm1_228",
                "questionText": "SelectÂ the two meetings in which people outside the Scrum Team are allowed to participate.",
                "catId": 8,
                "points": 1,
                "responseDescription": "",
                "type": "multiple"
            },
            {
                "id": "psm1_229",
                "questionText": "What are the three most applicable characteristics of the Product Owner?",
                "catId": 3,
                "points": 1,
                "responseDescription": "",
                "type": "multiple"
            },
            {
                "id": "psm1_230",
                "questionText": "What should be taken into account for  the Definition of  “Done ? Select the two most appropriate  items.  ",
                "catId": 2,
                "points": 1,
                "responseDescription": "If the definition of  “done  for an increment is part of the conventions, standards or guidelines  of the development organization, all Scrum Teams must follow it as a minimum. If  “done  for an  increment is not a convention of the development organization, the Development Team of the Scrum  Team must define a definition of  “done  appropriate for the product. If there are multiple Scrum  Teams working on the system or product release, the development teams on all of the Scrum Teams  must mutually define the definition of  “Done. If the definition of  “done  for an increment is part of the conventions, standards or guidelines  of the development organization, all Scrum Teams must follow it as a minimum. If  “done  for an  increment is not a convention of the development organization, the Development Team of the Scrum  Team must define a definition of  “done  appropriate for the product. If there are multiple Scrum  Teams working on the system or product release, the development teams on all of the Scrum Teams  must mutually define the definition of  “Done. ",
                "type": "multiple"
            },
            {
                "id": "psm1_242",
                "questionText": "During each Sprint Retrospective the Scrum Team reviews the Definition of Done and changes it if  necessary.  ",
                "catId": 8,
                "points": 1,
                "responseDescription": "During each Sprint Retrospective, the Scrum Team plans ways to increase product quality by adapting  the definition of  “Done  as appropriate.During each Sprint Retrospective, the Scrum Team plans ways to increase product quality by adapting  the definition of  “Done  as appropriate.",
                "type": "single"
            },
            {
                "id": "psm1_244",
                "questionText": "The Sprint Backlog is created at the Sprint Planning. It is prohibited to add new work into the Sprint  Backlog later by the Development Team.",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Development Team modifies the Sprint Backlog throughout the Sprint, and the Sprint Backlog emerges  during the Sprint. This emergence occurs as the Development Team works through the plan and learns  more about the work needed to achieve the Sprint Goal.  As new work is required, the Development  Team adds it to the Sprint Backlog.The Development Team modifies the Sprint Backlog throughout the Sprint, and the Sprint Backlog emerges  during the Sprint. This emergence occurs as the Development Team works through the plan and learns  more about the work needed to achieve the Sprint Goal.  As new work is required, the Development  Team adds it to the Sprint Backlog.",
                "type": "single"
            },
            {
                "id": "psm1_246",
                "questionText": "In which meetings the Key Stakeholders are allowed to participate?",
                "catId": 8,
                "points": 1,
                "responseDescription": "The Key Stakeholders are allowed to participate only in the Sprint Review meeting. However, any member  of the Scrum Team can interact with them any time.The Key Stakeholders are allowed to participate only in the Sprint Review meeting. However, any member  of the Scrum Team can interact with them any time.",
                "type": "multiple"
            },
            {
                "id": "psm1_247",
                "questionText": "What is Scrum?",
                "catId": 2,
                "points": 1,
                "responseDescription": "No, Scrum is a framework within which people can address complex adaptive problems, while delivering  valuable products.",
                "type": "single"
            },
            {
                "id": "psm1_249",
                "questionText": "Who is allowed to make changes in  the Product Backlog?",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Product Owner is the sole person responsible for the Product Backlog. However, he or she can  delegate  some work related to product backlog management to the Development Team.The Product Owner is the sole person responsible for the Product Backlog. However, he or she can  delegate  some work related to product backlog management to the Development Team.",
                "type": "multiple"
            },
            {
                "id": "psm1_251",
                "questionText": "Who is responsible for crafting the Sprint Goal at the Sprint Planning?",
                "catId": 8,
                "points": 1,
                "responseDescription": "After the Development Team forecasts the Product Backlog items it will deliver in the Sprint, the  Scrum Team crafts a Sprint Goal.After the Development Team forecasts the Product Backlog items it will deliver in the Sprint, the  Scrum Team crafts a Sprint Goal.",
                "type": "single"
            },
            {
                "id": "psm1_253",
                "questionText": "Could the Sprint Planning be finished if only work planned for the first days of the Sprint is decomposed  to units of one day or less?",
                "catId": 8,
                "points": 1,
                "responseDescription": "The Scrum Guide requires only the work planned for the first days of the Sprint is decomposed by  the end of the Sprint Planning, often to units of one day or less. However, the Development Team  should be able to explain to the Product Owner and Scrum Master how it intends to work as a self-organizing  team to accomplish the Sprint Goal and create the anticipated Increment.The Scrum Guide requires only the work planned for the first days of the Sprint is decomposed by  the end of the Sprint Planning, often to units of one day or less. However, the Development Team  should be able to explain to the Product Owner and Scrum Master how it intends to work as a self-organizing  team to accomplish the Sprint Goal and create the anticipated Increment.",
                "type": "single"
            },
            {
                "id": "psm1_254",
                "questionText": "What is the input to the Sprint Planning? Select four.",
                "catId": 8,
                "points": 1,
                "responseDescription": "The input to the Sprint Planning is the Product Backlog, the latest product Increment, projected  capacity of the Development Team during the Sprint, and past performance of the Development Team.The input to the Sprint Planning is the Product Backlog, the latest product Increment, projected  capacity of the Development Team during the Sprint, and past performance of the Development Team.",
                "type": "multiple"
            },
            {
                "id": "psm1_255",
                "questionText": "Who participates in the Sprint Planning? Select three.",
                "catId": 8,
                "points": 1,
                "responseDescription": "The work to be performed in the Sprint is planned at the Sprint Planning. This plan is created by  the collaborative work of the entire Scrum Team.The work to be performed in the Sprint is planned at the Sprint Planning. This plan is created by  the collaborative work of the entire Scrum Team.",
                "type": "multiple"
            },
            {
                "id": "psm1_256",
                "questionText": "Only the Product Owner and the Development Team participate in the Sprint Planning. There is nothing  to do for the Scrum Master.",
                "catId": 8,
                "points": 1,
                "responseDescription": "The work to be performed in the Sprint is planned at the Sprint Planning. This plan is created by  the collaborative work of the entire Scrum Team.The work to be performed in the Sprint is planned at the Sprint Planning. This plan is created by  the collaborative work of the entire Scrum Team.",
                "type": "single"
            },
            {
                "id": "psm1_259",
                "questionText": "It is normal  to have a  “hardening  Sprint to remove all technical debt and prepare the Product  for upcoming release.",
                "catId": 2,
                "points": 1,
                "responseDescription": "It is not normal.  Development Teams deliver an Increment of product functionality every Sprint.  This Increment is usable, so a Product Owner may choose to immediately release it. So, there  is nothing to prepare. Each increment contains only  “Done  functionality that could be released  immediately.  It is not normal.  Development Teams deliver an Increment of product functionality every Sprint.  This Increment is usable, so a Product Owner may choose to immediately release it. So, there  is nothing to prepare. Each increment contains only  “Done  functionality that could be released  immediately.  ",
                "type": "single"
            },
            {
                "id": "psm1_260",
                "questionText": "  What happens when a Sprint is cancelled? Select three.  ",
                "catId": 8,
                "points": 1,
                "responseDescription": "When a Sprint is cancelled, any completed and  “Done  Product Backlog items are reviewed. If part  of the work is potentially releasable, the Product Owner typically accepts it. All incomplete  Product Backlog Items are re-estimated and put back on the Product Backlog.When a Sprint is cancelled, any completed and  “Done  Product Backlog items are reviewed. If part  of the work is potentially releasable, the Product Owner typically accepts it. All incomplete  Product Backlog Items are re-estimated and put back on the Product Backlog.",
                "type": "multiple"
            },
            {
                "id": "psm1_263",
                "questionText": "The Development Team should be able to explain to the Product Owner and Scrum Master how it intends  to work as a self-organizing team to accomplish the Sprint Goal and create the anticipated Increment.",
                "catId": 8,
                "points": 1,
                "responseDescription": "By the end of the Sprint Planning, the Development Team should be able to explain to the Product  Owner and Scrum Master how it intends to work as a self-organizing team to accomplish the Sprint  Goal and create the anticipated Increment.By the end of the Sprint Planning, the Development Team should be able to explain to the Product  Owner and Scrum Master how it intends to work as a self-organizing team to accomplish the Sprint  Goal and create the anticipated Increment.",
                "type": "single"
            },
            {
                "id": "psm1_266",
                "questionText": "Is it allowed  to skip the Daily Scrum if there is nothing interesting to tell about?",
                "catId": 8,
                "points": 1,
                "responseDescription": "Each event in Scrum is a formal opportunity to inspect and adapt something. These events are specifically  designed to enable critical transparency and inspection. Failure to include any of these events  results in reduced transparency and is a lost opportunity to inspect and adapt.Each event in Scrum is a formal opportunity to inspect and adapt something. These events are specifically  designed to enable critical transparency and inspection. Failure to include any of these events  results in reduced transparency and is a lost opportunity to inspect and adapt.",
                "type": "single"
            },
            {
                "id": "psm1_267",
                "questionText": "Could the Product Owner and the Scrum Master be a part of the Development Team?",
                "catId": 3,
                "points": 1,
                "responseDescription": "Yes. Scrum does not prohibit the Product Owner or the Scrum Master do development work. However,  it is not the best practice because it could create a conflict of interest.Yes. Scrum does not prohibit the Product Owner or the Scrum Master do development work. However,  it is not the best practice because it could create a conflict of interest.",
                "type": "single"
            },
            {
                "id": "psm1_268",
                "questionText": "How frequently should scrum users inspect Scrum artifacts and progress toward a Sprint Goal?",
                "catId": 2,
                "points": 1,
                "responseDescription": "Scrum users must frequently inspect Scrum artifacts and progress toward a Sprint Goal to detect undesirable  variances. Their inspection should not be so frequent that inspection gets in the way of the  work. Inspections are most beneficial when diligently performed by skilled inspectors at the  point of work.Scrum users must frequently inspect Scrum artifacts and progress toward a Sprint Goal to detect undesirable  variances. Their inspection should not be so frequent that inspection gets in the way of the  work. Inspections are most beneficial when diligently performed by skilled inspectors at the  point of work.",
                "type": "single"
            },
            {
                "id": "psm1_272",
                "questionText": "How does the Scrum Master serve the Organization? Select the three most appropriate answers.",
                "catId": 3,
                "points": 1,
                "responseDescription": "The Scrum Master serves the organization in several ways, including:The Scrum Master serves the organization in several ways, including:",
                "type": "multiple"
            },
            {
                "id": "psm1_275",
                "questionText": "What does Product Backlog management include? Select three most applicable items.",
                "catId": 3,
                "points": 1,
                "responseDescription": "Product Backlog management includes:Product Backlog management includes:",
                "type": "multiple"
            },
            {
                "id": "psm1_361",
                "questionText": "What comprises Scrum (select four)?",
                "catId": 2,
                "points": 1,
                "responseDescription": "The Scrum framework consists of Scrum Teams and their associated roles, events, artifacts, and rules.  Each component within the framework serves a specific purpose and is essential to Scrum's success  and usage. The rules of Scrum bind together the events, roles, and artifacts, governing the relationships  and interaction between them.The Scrum framework consists of Scrum Teams and their associated roles, events, artifacts, and rules.  Each component within the framework serves a specific purpose and is essential to Scrum's success  and usage. The rules of Scrum bind together the events, roles, and artifacts, governing the relationships  and interaction between them.",
                "type": "multiple"
            },
            {
                "id": "psm1_376",
                "questionText": "How does Definition of  “Done  help to the Scrum Team? Select the three most applicable items.",
                "catId": 9,
                "points": 1,
                "responseDescription": "",
                "type": "multiple"
            },
            {
                "id": "psm1_377",
                "questionText": "What does   the word  “development  mean in the context of Scrum? Select the best option.",
                "catId": 2,
                "points": 1,
                "responseDescription": "When the words  “develop  and  “development  are used in the Scrum Guide, they refer to complex work  including software and hardware development, development and releasing of products and enhancements,  development and sustaining product operational environments, research and identifying of viable  markets and technologies, and even more.When the words  “develop  and  “development  are used in the Scrum Guide, they refer to complex work  including software and hardware development, development and releasing of products and enhancements,  development and sustaining product operational environments, research and identifying of viable  markets and technologies, and even more.",
                "type": "single"
            },
            {
                "id": "psm1_378",
                "questionText": "Where Scrum can be used? Check all the applicable items.",
                "catId": 2,
                "points": 1,
                "responseDescription": "Scrum has been used to develop software, hardware, embedded software, networks of interacting function,  autonomous vehicles, schools, government, marketing, managing the operation of organizations  and almost everything we use in our daily lives, as individuals and societies.Scrum has been used extensively, worldwide, to:Scrum has been used to develop software, hardware, embedded software, networks of interacting function,  autonomous vehicles, schools, government, marketing, managing the operation of organizations  and almost everything we use in our daily lives, as individuals and societies.Scrum has been used extensively, worldwide, to:",
                "type": "multiple"
            },
            {
                "id": "psm1_379",
                "questionText": "What is the essence of Scrum? Select the most appropriate option.",
                "catId": 2,
                "points": 1,
                "responseDescription": "The essence of Scrum is a small team of people. The individual team is highly flexible and adaptive.  These strengths continue operating in single, several, many, and networks of teams that develop,  release, operate and sustain the work and work products of thousands of people. They collaborate  and interoperate through sophisticated development architectures and target release environments.The essence of Scrum is a small team of people. The individual team is highly flexible and adaptive.  These strengths continue operating in single, several, many, and networks of teams that develop,  release, operate and sustain the work and work products of thousands of people. They collaborate  and interoperate through sophisticated development architectures and target release environments.",
                "type": "single"
            },
            {
                "id": "psm1_386",
                "questionText": "What are the three questions the Scrum Guide gives as an example that can be used  at the Daily  Scrum?  ",
                "catId": 8,
                "points": 1,
                "responseDescription": "The structure of the Daily Scrum is set by the Development Team and can be conducted in different  ways if it focuses on progress toward the Sprint Goal. Some Development Teams will use questions,  some will be more discussion based. Here is an example of what might be used:The structure of the Daily Scrum is set by the Development Team and can be conducted in different  ways if it focuses on progress toward the Sprint Goal. Some Development Teams will use questions,  some will be more discussion based. Here is an example of what might be used:",
                "type": "multiple"
            },
            {
                "id": "psm1_388",
                "questionText": "Select the five Scrum Values.",
                "catId": 2,
                "points": 1,
                "responseDescription": "The Scrum Guide recognizes the following Scrum Values: commitment, courage, focus, openness and respect.The Scrum Guide recognizes the following Scrum Values: commitment, courage, focus, openness and respect.",
                "type": "multiple"
            },
            {
                "id": "psm1_389",
                "questionText": "Who is responsible for promoting and supporting Scrum? Select the best choice.",
                "catId": 3,
                "points": 1,
                "responseDescription": "The Scrum Master is responsible for promoting and supporting Scrum as defined in the Scrum Guide.  Scrum Masters do this by helping everyone understand Scrum theory, practices, rules, and values.The Scrum Master is responsible for promoting and supporting Scrum as defined in the Scrum Guide.  Scrum Masters do this by helping everyone understand Scrum theory, practices, rules, and values.",
                "type": "single"
            },
            {
                "id": "psm1_395",
                "questionText": "The Daily Scrum always should take exactly 15 minutes. For example, if your team managed doing it  in 5 minutes, you should spend 10 more minutes on some useful team activity like  Product  Backlog refinement, but not more.",
                "catId": 8,
                "points": 1,
                "responseDescription": "All events in Scrum are time-boxed. It means that every event has a maximum duration. However, the  Scrum Guide does not require a minimal duration for any event.  As Scrum Teams mature, they  can do some events faster (e.g. the Sprint Planning or the Sprint Retrospective).All events in Scrum are time-boxed. It means that every event has a maximum duration. However, the  Scrum Guide does not require a minimal duration for any event.  As Scrum Teams mature, they  can do some events faster (e.g. the Sprint Planning or the Sprint Retrospective).",
                "type": "single"
            },
            {
                "id": "psm1_396",
                "questionText": "The structure of the Daily Scrum is well-defined and constant. Every team member should answer the  three main questions:",
                "catId": 8,
                "points": 1,
                "responseDescription": "There is no any prescribed structure. The structure of the Daily Scrum is set by the Development  Team and can be conducted in different ways if it focuses on progress toward the Sprint Goal.  Some Development Teams will use questions, some will be more discussion based. It is still perfectly  fine to use the questions, but other ways of conducting the meeting are also possible.There is no any prescribed structure. The structure of the Daily Scrum is set by the Development  Team and can be conducted in different ways if it focuses on progress toward the Sprint Goal.  Some Development Teams will use questions, some will be more discussion based. It is still perfectly  fine to use the questions, but other ways of conducting the meeting are also possible.",
                "type": "single"
            },
            {
                "id": "psm1_397",
                "questionText": "Imagine the following situation. At the Sprint Retrospective meeting the Scrum Team identified some  improvements that can be done. What should the Scrum Team do? Select the best option.",
                "catId": 9,
                "points": 1,
                "responseDescription": "The Sprint Backlog makes visible all the work that the Development Team identifies as necessary to  meet the Sprint Goal. To ensure continuous improvement, it includes at least one high priority  process improvement identified in the previous Retrospective meeting.The Sprint Backlog makes visible all the work that the Development Team identifies as necessary to  meet the Sprint Goal. To ensure continuous improvement, it includes at least one high priority  process improvement identified in the previous Retrospective meeting.",
                "type": "single"
            },
            {
                "id": "psm1_534",
                "questionText": "Check all the formal opportunities to inspect and adapt.",
                "catId": 8,
                "points": 1,
                "responseDescription": "Other than the Sprint itself, which is a container for all other events, each event in Scrum is a  formal opportunity to inspect and adapt something. These events are specifically designed to  enable critical transparency and inspection.Other than the Sprint itself, which is a container for all other events, each event in Scrum is a  formal opportunity to inspect and adapt something. These events are specifically designed to  enable critical transparency and inspection.",
                "type": "multiple"
            },
            {
                "id": "psm1_536",
                "questionText": "How does the Scrum Master help the Product Owner? Select the three most appropriate answers.",
                "catId": 3,
                "points": 1,
                "responseDescription": "The Scrum Master serves the Product Owner in several ways, including:The Scrum Master serves the Product Owner in several ways, including:",
                "type": "multiple"
            },
            {
                "id": "psm1_540",
                "questionText": "Other people than the Scrum Team can attend the Sprint Planning  in order to provide technical  or domain advice.",
                "catId": 8,
                "points": 1,
                "responseDescription": "The Development Team may also invite other people to attend in order to provide technical or domain  advice.  The Development Team may also invite other people to attend in order to provide technical or domain  advice.  ",
                "type": "single"
            }
        ],
        userAnswers: {

        },
        questionStates: {

        },
        scores: {

        },
        nickname: ""
    }



    handleInputCheck = (event, isInputChecked, optionId) => {
        let currentQuestionUserAnswers = { ...this.state.userAnswers[this.getCurrentQuestionId()] };
        currentQuestionUserAnswers[optionId] = {}
        currentQuestionUserAnswers[optionId].checked = isInputChecked;

        this.setState({
            userAnswers: {
                ...this.state.userAnswers,
                [this.getCurrentQuestionId()]: currentQuestionUserAnswers
            }
        })
    }

    checkCurrentQuestion = () => {
        let isAnsweredCorrectly = true;
        let answersToQuestion = { ...this.state.userAnswers[this.getCurrentQuestionId()] };
        this.state.options[this.getCurrentQuestionId()].forEach(element => {
            let singleAnswer = answersToQuestion[element.answerTextId] || {}
            const itIs = singleAnswer.checked ? 1 : 0;
            const toBe = element.correct;
            const isSame = toBe === itIs ? 1 : 0;
            singleAnswer.correct = isSame;
            answersToQuestion[element.answerTextId] = singleAnswer;
            isAnsweredCorrectly = isAnsweredCorrectly && isSame;
        });

        const currentScores = { ...this.state.scores };
        currentScores[this.getCurrentQuestionId()] = isAnsweredCorrectly ? 1 : 0;

        this.setState({
            userAnswers: {
                ...this.state.userAnswers,
                [this.getCurrentQuestionId()]: answersToQuestion
            },
            scores: currentScores
        })
    }

    nextClickHandler = () => {
        console.log("next clicked")
        if ((this.state.counter + 1) < this.state.questions.length) {
            this.setState({
                counter: this.state.counter + 1,
                showNext: false
            })
        }
    }

    backClickHandler = () => {
        console.log("back clicked")
        if ((this.state.counter - 1) >= 0) {
            this.setState({
                counter: this.state.counter - 1
            })
        } else {
            this.exitClickHandler();
        }

    }

    checkClickHandler = () => {
        console.log("check clicked");

        this.checkCurrentQuestion();
        let questionStates = { ...this.state.questionStates };
        let currentQuestionState = this.state.questionStates[this.getCurrentQuestionId] || {};
        currentQuestionState.validated = true;
        currentQuestionState.disabled = true;
        questionStates[this.getCurrentQuestionId()] = currentQuestionState;
        this.setState({
            questionStates: questionStates,
            showNext: true
        })
    }


    finishClickHandler = () => {
        this.setState({
            finish: true
        })
    }

    exitClickHandler = () => {
        this.setState({ ...this.state, showHighScoreModal: true })
    }

    saveClickHandler = () => {
        this.props.onAddHighScore("psm1", {
            score: this.getTotalScore(),
            name: this.state.nickname,
            date: Date.now()
        })
        // TODO: check that if saving the scores fails the user is not redirected
        this.setState({ ...this.state, showHighScoreModal: false })
        this.props.history.push('/');
    }

    dismissClickHandler = () => {
        this.setState({ ...this.state, showHighScoreModal: false })
        this.props.history.push('/');
    }

    closeClickHandler = () => {
        this.setState({ ...this.state, showHighScoreModal: false })
        this.props.history.push('/');
    }
    nicknameChangeHandler = (event) => {
        this.setState({ ...this.state, nickname: event.target.value })
    }



    getCurrentQuestionId = () => {
        return this.state.questions[this.state.counter].id;
    }

    getTotalScore = () => {
        const scoresValues = Object.values(this.state.scores);
        return scoresValues.length === 0 ? 0 : scoresValues.reduce((prev, akt) => prev + akt);
    }

    componentDidMount = () => {
        this.setState({
            startTime: Date.now()
        })
    }
    getElapsedTime = () => {
        // using static methods
        var start = this.state.startTime;
        var end = Date.now();
        var elapsed = end - start; // time in milliseconds
        var difference = new Date(elapsed);
        var diff_mins = difference.getMinutes();
        var diff_seconds = difference.getSeconds();
        return `${diff_mins}:${diff_seconds}`
    }


    render() {

        const questionScreen = (
            <Aux>
                <CardTitle title="Scrum Quiz: PSM1" subtitle={`${this.state.counter + 1} / ${this.state.questions.length} | current score: ${this.getTotalScore()}`} />

                <Card style={styles.card}>
                    <CardText>
                        <CheckBoxQuestion
                            questionText={this.state.questions[this.state.counter].questionText}
                            onInputCheck={this.handleInputCheck}
                            options={this.state.options[this.getCurrentQuestionId()]}
                            descriptionText={this.state.questions[this.state.counter].responseDescription}
                            userAnswer={this.state.userAnswers[this.getCurrentQuestionId()]}
                            questionState={this.state.questionStates[this.getCurrentQuestionId()]}
                            setScore={this.setScore} />
                    </CardText>
                </Card>

                <Paper zDepth={1} style={styles.bottomNavigation}>
                    <BottomNavigation selectedIndex={1}>
                        <BottomNavigationItem
                            label="back"
                            icon={back}
                            onClick={() => this.backClickHandler()}
                        />
                        {this.state.showNext ? <BottomNavigationItem
                            label="next"
                            icon={next}
                            onClick={() => this.nextClickHandler()}
                            style={styles.activeButton}

                        /> :
                            <BottomNavigationItem
                                label="check"
                                icon={check}
                                onClick={() => this.checkClickHandler()}
                                style={styles.activeButton}
                            />}
                        <BottomNavigationItem
                            label="finish"
                            icon={finish}
                            onClick={() => this.finishClickHandler()}
                        />
                    </BottomNavigation>
                </Paper>
            </Aux>
        );

        const finishScreen = (

            <Aux>
                <Modal show={this.state.showHighScoreModal} clicked={this.closeHighScoreModal}>
                    <h1>Wanna be challeged?</h1>
                    <p>If you want to save your highscore, please enter a nickname. Please mind that the nickname will be shown in the leaderboard.</p>
                    <TextField
                        floatingLabelText="Nickname"
                        fullWidth={true}
                        value={this.state.nickname}
                        onChange={this.nicknameChangeHandler}
                    />
                    <RaisedButton onClick={this.saveClickHandler} primary label="save" />
                    <RaisedButton onClick={this.dismissClickHandler} secondary label="dismiss" />
                </Modal>

                <Card style={styles.card}>
                    <CardTitle title="You're Done!" subtitle={`${this.state.counter + 1} / ${this.state.questions.length} | current score: ${this.getTotalScore()}`} />
                    <CardText>


                        <Table>
                            <TableBody displayRowCheckbox={false} selectable={false}>
                                <TableRow>
                                    <TableRowColumn>Total Time</TableRowColumn>
                                    <TableRowColumn>{this.getElapsedTime()}</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>Total Score:</TableRowColumn>
                                    <TableRowColumn>{this.getTotalScore()}</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>Ready for Exam:</TableRowColumn>
                                    <TableRowColumn>
                                        {this.getTotalScore() > 79 ? "Exam forecast:Congratulations: your are now ready for the PSM1 exam!!" : null}
                                        {this.getTotalScore() >= 65 ? "Nice try: keep up the good work - soon you'll be ready for the exam!" : null}
                                        {this.getTotalScore() < 65 ? "Not yet: try again!" : null}
                                    </TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </CardText>
                    <CardActions>
                        <RaisedButton onClick={this.exitClickHandler} secondary label="exit" style={styles.button} />
                    </CardActions>
                </Card>
            </Aux>

        )

        return (
            <div>
                {this.state.finish ? finishScreen : questionScreen}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        highscores: state.highScore.psm1,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddHighScore: (name, highScore) => dispatch(actions.addHighScore(name, highScore))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuizzArea));