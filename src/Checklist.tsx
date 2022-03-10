import React from "react";
import { IObject } from "./App";

interface IProps {
    Objects: IObject[];
    Checked: number[];
    Title: string;
    HideChecked: boolean;
    onCheck: (id: number, checked: boolean) => void;
}

export default class Checklist extends React.Component<IProps, {}> {
    render() {
        const objects = this.props.Objects.sort((a, b) => a.ID - b.ID).map((a, idx) => {
            const missable = a.Flag ? (
                <span style={{ color: "orange" }}>[Warning: Missable]</span>
            ) : (<></>);
            const checked = this.props.Checked.indexOf(a.ID) !== -1;
            return (
                <li key={`object_${idx}`} style={checked && this.props.HideChecked ? { "display": "none" } : {}}>
                    <label className={checked ? "checked" : ""}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`object_${idx}`}
                                checked={checked}
                                onChange={(evt) => this.props.onCheck(a.ID, evt.target.checked)} />
                            <span className="form-check-label">
                                {missable} <strong>{a.Name}</strong>: {a.Description}
                            </span>
                        </div>
                    </label>
                </li>
            )
        });

        return (
            <div>
                <h3>{this.props.Title}</h3>
                <ul>
                    {objects}
                </ul>
            </div>
        )
    }
}

const checkedStyle = {
    textDecoration: "line-through"
};