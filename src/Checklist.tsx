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

    onCollapse(evt: React.MouseEvent<HTMLAnchorElement>) {
        var target = evt.target as HTMLElement;
        if (target.innerText === "[Hide]")
            target.innerText = "[Show]";
        else if (target.innerText === "[Show]")
            target.innerText = "[Hide]";
    }
    render() {
        const id = `_${this.props.Title.toLowerCase().replace(/[^a-zA-Z]/gi, "-").replace(/\s+/gi, "-")}_list`;
        var numChecked = 0;
        const objects = this.props.Objects.sort((a, b) => a.ID - b.ID).map((a, idx) => {
            const missable = a.Flag ? (
                <span style={{ color: "orange" }}>[Warning: Missable]</span>
            ) : (<></>);

            const checked = this.props.Checked.indexOf(a.ID) !== -1;
            if (checked)
                numChecked++;

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
                                {missable} <strong>{a.Name}</strong>: <span dangerouslySetInnerHTML={{ __html: a.Description }}></span>
                            </span>
                        </div>
                    </label>
                </li>
            )
        });

        return (
            <div>
                <div className="header">
                    <h3>{this.props.Title} <span className={"checked-count " + (numChecked === this.props.Objects.length ? "complete" : "")}>({numChecked}/{this.props.Objects.length})</span></h3>
                    <a data-bs-toggle="collapse" href={`#${id}`} role="button" aria-expanded="true" aria-controls={id} onClick={this.onCollapse}>
                        [Hide]
                    </a>
                </div>
                <div className="collapse show" id={id}>
                    <ul>
                        {objects}
                    </ul>
                </div>
            </div>
        )
    }
}
