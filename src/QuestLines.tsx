import React from "react";
import { IChecklist } from "./App";
import Checklist from "./Checklist"

interface IProps {
    Checklist: IChecklist,
    Checked: number[],
    HideChecked: boolean,
    onCheck: (id: number, checked: boolean) => void,
}

export default class QuestLines extends React.Component<IProps, {}> {
    render() {
        const questLines = Object.keys(this.props.Checklist.QuestLines).map(key => {
            return (
                <Checklist
                    Objects={this.props.Checklist.QuestLines[key]}
                    Checked={this.props.Checked}
                    HideChecked={this.props.HideChecked}
                    Title={key}
                    onCheck={(id, chk) => this.props.onCheck(id, chk)} />
            );
        });
        return (
            <div>
                { questLines }
            </div>
        )
    }
}
