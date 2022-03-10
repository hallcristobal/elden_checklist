import React from 'react';
import './App.css';
import Achievements from './Achievements';
import Collectables from './Collectables';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export interface IAchivement {
  "ID": number;
  "Achievement Name": string;
  "Requirement": string;
  "Type": string;
  "Missable": boolean;
}

export interface IObject {
  "ID": number;
  "Name": string;
  "Description": string;
  "Flag": boolean;
}

export interface IChecklist {
  "Achivements": IAchivement[];
  "Legendary Armaments": IObject[];
  "Legendary Ashen Remains": IObject[];
  "Legendary Sorcery-Incantations": IObject[];
  "Legendary Talismans": IObject[];
}

interface ILocalStorage {
  Checked: number[];
  HideChecked: boolean;
}

enum Tab {
  Achievements,
  Collectables,
}

interface IState {
  Checklist: IChecklist | null;
  Loading: boolean;
  Checked: number[];
  activeTab: Tab;
  HideChecked: boolean;
}

const STORAGE_KEY = "elden.ring.checklist.marked";

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      Checklist: null,
      Loading: true,
      Checked: [],
      activeTab: this.getCurrentTab(),
      HideChecked: false,
    };
  }

  getCurrentTab() {
    const pathname = window.location.pathname;
    if (pathname.startsWith("/collectables")) {
      return Tab.Collectables;
    }
    return Tab.Achievements;
  }

  loadLocalStorage() {
    if (Storage) {
      try {
        var item = window.localStorage.getItem(STORAGE_KEY);
        if (item === null)
          return { Checked: [], HideChecked: false };

        var items = JSON.parse(item) as ILocalStorage;
        return items;
      } catch (e) {
        console.error(e);
      }
    }

    return { Checked: [], HideChecked: false };
  }

  saveLocalStorage() {
    if (Storage) {
      const data: ILocalStorage = {
        Checked: this.state.Checked,
        HideChecked: this.state.HideChecked
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }

  async componentDidMount() {
    var checklist = await (await fetch("./er_checklist.json")).json() as IChecklist;
    var checked = this.loadLocalStorage();
    this.setState({
      Checklist: checklist,
      Loading: false,
      Checked: checked.Checked,
      HideChecked: checked.HideChecked
    });
  }

  onCheck(id: number, checked: boolean) {
    var checkedIds = this.state.Checked;
    if (checked) {
      if (checkedIds.indexOf(id) === -1) {
        checkedIds.push(id);
      }
    } else {
      checkedIds = checkedIds.filter(x => x !== id);
    }

    this.setState({
      Checked: checkedIds
    }, () => this.saveLocalStorage());
  }

  clearChecks() {
    this.setState({
      Checked: []
    }, () => this.saveLocalStorage());
  }

  setCurrentTab(tab: Tab) {
    this.setState({
      activeTab: tab
    });
  }

  setHideChecked(evt: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      HideChecked: evt.target.checked
    }, () => this.saveLocalStorage());
  }

  render() {
    const body = this.state.Loading === true
      ? (<div>Loading...</div>)
      : this.state.Checklist !== null ? (
        <>
          <Routes>
            <Route path="/collectables"
              element={<Collectables
                Checked={this.state.Checked}
                Checklist={this.state.Checklist}
                HideChecked={this.state.HideChecked}
                onCheck={(id, checked) => this.onCheck(id, checked)}
              />}
            />
            <Route path="*"
              element={<Achievements
                Achievements={this.state.Checklist.Achivements}
                Checked={this.state.Checked}
                HideChecked={this.state.HideChecked}
                onCheck={(id, chk) => this.onCheck(id, chk)}
              />}
            />
          </Routes>
        </>
      ) : (<div>Failed to Load List</div>);

    return (
      <>
        <BrowserRouter>
          <div className="App container">
            <nav>
              <div className="nav nav-tabs mt-3" id="nav-tab">
                <Link
                  className="nav-link"
                  type="button"
                  to="/">Achievements</Link>
                <Link
                  className="nav-link"
                  type="button"
                  to="/collectables">Collectables</Link>
              </div>
            </nav>
            <div className="row mt-2 mb-4">
              <div className="col-auto">
                <button className='btn btn-danger btn-sm' type='button' onClick={() => this.clearChecks()}>Clear All</button>
              </div>
              <div className="col-auto form-check form-switch">
                <input className="form-check-input" type="checkbox" id="hideCompleted" checked={this.state.HideChecked} onChange={(evt) => this.setHideChecked(evt)} />
                <label className="form-check-label" htmlFor="hideCompleted">Hide Completed</label>
              </div>
            </div>
            {body}
          </div>
        </BrowserRouter>
      </>
    );
  }
}
