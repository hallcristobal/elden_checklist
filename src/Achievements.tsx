import React from "react";
import { IAchivement } from "./App";

interface IProps {
    Achievements: IAchivement[];
    Checked: number[];
    HideChecked: boolean,
    onCheck: (id: number, checked: boolean) => void;
}

interface IState {
    groups: string[];
}

export default class Achievements extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            groups: this.props.Achievements.map(a => a.Type).filter(onlyUnique)
        };
    }

    render() {
        const groups = this.state.groups.map((group, _idx) => {
            const achivementList = this.props.Achievements.filter(a => a.Type === group).sort((a, b) => a.ID - b.ID).map((a, idx) => {
                const missable = a.Missable ? (
                    <span style={{ color: "red" }}>[Missable]</span>
                ) : (<></>);
                const checked = this.props.Checked.indexOf(a.ID) !== -1;
                return (
                    <li key={`achievement_${_idx}_${idx}`} style={checked && this.props.HideChecked ? { "display": "none" } : {}}>
                        <label className={checked ? "checked" : ""}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`achievement_${_idx}_${idx}`}
                                    checked={checked}
                                    onChange={(evt) => this.props.onCheck(a.ID, evt.target.checked)} />
                                <span className="form-check-label">
                                    {missable} <strong>{a["Achievement Name"]}</strong>: {a.Requirement}
                                </span>
                            </div>
                        </label>
                    </li>
                )
            });

            return (
                <span key={`list_group_${_idx}`}>
                    <h3>{`${group} Achievements`}</h3>
                    <ul>
                        {achivementList}
                    </ul>
                </span>
            )
        })
        return (
            <div>
                {groups}
            </div>
        )
    }
}

function onlyUnique(value: string, index: number, self: string[]) {
    return self.indexOf(value) === index;
}