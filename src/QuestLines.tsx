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
        return (
            <div>
                <Checklist
                    Objects={this.props.Checklist['Millicent']}
                    Checked={this.props.Checked}
                    HideChecked={this.props.HideChecked}
                    Title='Millicent'
                    onCheck={(id, chk) => this.props.onCheck(id, chk)} />
                <Checklist
                    Objects={this.props.Checklist['Dung Eater']}
                    Checked={this.props.Checked}
                    HideChecked={this.props.HideChecked}
                    Title='Dung Eater'
                    onCheck={(id, chk) => this.props.onCheck(id, chk)} />
            </div>
        )
    }
}
