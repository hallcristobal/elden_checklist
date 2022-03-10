import React from "react";
import { IChecklist } from "./App";
import Checklist from "./Checklist"

interface IProps {
    Checklist: IChecklist,
    Checked: number[],
    HideChecked: boolean,
    onCheck: (id: number, checked: boolean) => void,
}

export default class Collectables extends React.Component<IProps, {}> {
    render() {
        return (
            <div>
                <Checklist
                    Objects={this.props.Checklist['Legendary Armaments']}
                    Checked={this.props.Checked}
                    HideChecked={this.props.HideChecked}
                    Title='Legendary Armaments'
                    onCheck={(id, chk) => this.props.onCheck(id, chk)} />
                <Checklist
                    Objects={this.props.Checklist["Legendary Ashen Remains"]}
                    Checked={this.props.Checked}
                    HideChecked={this.props.HideChecked}
                    Title="Legendary Ashen Remains"
                    onCheck={(id, chk) => this.props.onCheck(id, chk)} />
                <Checklist
                    Objects={this.props.Checklist["Legendary Sorcery-Incantations"]}
                    Checked={this.props.Checked}
                    HideChecked={this.props.HideChecked}
                    Title="Legendary Sorcery/Incantations"
                    onCheck={(id, chk) => this.props.onCheck(id, chk)} />
                <Checklist
                    Objects={this.props.Checklist["Legendary Talismans"]}
                    Checked={this.props.Checked}
                    HideChecked={this.props.HideChecked}
                    Title="Legendary Talismans"
                    onCheck={(id, chk) => this.props.onCheck(id, chk)} />
            </div>
        )
    }
}
