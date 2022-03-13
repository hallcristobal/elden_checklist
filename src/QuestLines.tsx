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
        const questLines = Object.keys(this.props.Checklist.QuestLines).sort().map(key => {
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

                <div className="alert d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                    </svg>
                    <div>
                        Quest Steps scraped from <a href="https://eldenring.wiki.fextralife.com/NPCs">Fextralife's NPC Page</a>
                    </div>
                </div>
                {questLines}
            </div>
        )
    }
}
