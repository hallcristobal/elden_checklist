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

    onCollapse(evt: React.MouseEvent<HTMLAnchorElement>) {
        var target = evt.target as HTMLElement;
        if (target.innerText === "[Hide]")
            target.innerText = "[Show]";
        else if (target.innerText === "[Show]")
            target.innerText = "[Hide]";
    }

    render() {
        const groups = this.state.groups.map((group, _idx) => {
            const id = `${group.toLowerCase()}_achievements`;
            var numChecked = 0;

            const achivementList = this.props.Achievements.filter(a => a.Type === group).sort((a, b) => a.ID - b.ID).map((a, idx) => {
                const missable = a.Missable ? (
                    <span style={{ color: "red" }}>[Missable]</span>
                ) : (<></>);

                const checked = this.props.Checked.indexOf(a.ID) !== -1;
                if (checked)
                    numChecked++;

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
                <>
                    <div className="header">
                        <h3>{`${group} Achievements`}  <span className={"checked-count " + (numChecked === achivementList.length ? "complete" : "")}>({numChecked}/{achivementList.length})</span></h3>
                        <a data-bs-toggle="collapse" href={`#${id}`} role="button" aria-expanded="false" aria-controls={id} onClick={this.onCollapse}>
                            [Hide]
                        </a>
                    </div>
                    <div className="collapse show" id={id}>
                        <ul>
                            {achivementList}
                        </ul>
                    </div>
                </>
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
