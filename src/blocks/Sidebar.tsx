import * as React from 'react'
import FabricIcon from '../components/FabricIcon'
import { NavLink } from 'react-router-dom'
import history from './../routes/History'

export default class Sidebar extends React.Component<any, any> {

  public render() {
    return (
      <div className="sidebar" style={{ zIndex: 99}}>        
        <nav className="sidebar-nav">
          <ul className="nav">
{/*
            <li className="nav-title">
              Model
            </li>
            <li className="nav-item">
              <NavLink to={'/dla/datasets'} className="nav-link" activeClassName="active"><FabricIcon name="Album"/> Datasets</NavLink>
            </li>
            <li className={this.activeRoute("/dla/datasets")}>
              <a className="nav-link nav-dropdown-toggle" href="/dla/datasets" onClick={this.handleClick.bind(this)}><i className="ms-Icon ms-Icon--Album"></i> Datasets</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/dla/datasets/new'} className="nav-link" activeClassName="active"><i className="ms-Icon ms-Icon--Page" aria-hidden="true"></i> New Dataset</NavLink>
                </li>
              </ul>
            </li>
*/}
{/*
          <li className={this.activeRoute("/dla/explorer")}>
              <a href="" className="nav-link nav-dropdown-toggle" onClick={e => this.handleClick(e)}><i className="ms-Icon ms-Icon--BarChart4"></i> Explorer </a>
              <ul className="nav-dropdown-items">
*/}
                <li className="nav-item">
                  <NavLink to={'/dla/board'} className="nav-link" activeClassName="active"><FabricIcon name="Home"/> Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/explorer/notes/list'} className="nav-link" activeClassName="active"><FabricIcon name="ReadingMode"/> Notes</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/explorer/flows'} className="nav-link" activeClassName="active"><FabricIcon name="Flow"/> Flows</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/explorer/note/scratchpad'} className="nav-link" activeClassName="active"><FabricIcon name="NoteForward"/> Scratchpad</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/explorer/history'} className="nav-link" activeClassName="active"><FabricIcon name="GitGraph"/> History</NavLink>
                </li>
{/*
                <li className="nav-item">
                  <NavLink to={'/dla/stories'} className="nav-link" activeClassName="active"><FabricIcon name="InternetSharing"/> Stories</NavLink>
                </li>
*/}
{/*
              </ul>
            </li>
*/}
{/*
            <li className="divider"></li>
            <li className="nav-title">
              Deploy
            </li>
            <li className="divider"></li>
*/}
          <li className={this.activeRoute("/dla/kuber")}>
              <a href="" className="nav-link nav-dropdown-toggle" onClick={e => this.handleClick(e)}><i className=""></i> Kuber</a>
              <ul className="nav-dropdown-items">
              <li className="nav-item">
                  <NavLink to={'/dla/kuber/calendar'} className="nav-link" activeClassName="active"><FabricIcon name="Calendar"/> Calendar</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/kuber/users'} className="nav-link" activeClassName="active"><FabricIcon name="People"/> Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/kuber/profile'} className="nav-link" activeClassName="active"><FabricIcon name="Accounts"/> Profile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/kuber/settings'} className="nav-link" activeClassName="active"><FabricIcon name="Settings"/> Settings</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/kuber/costs'} className="nav-link" activeClassName="active"><FabricIcon name="Money"/> Costs</NavLink>
                </li>
              </ul>
            </li>
{/*
            <li className="divider"></li>
*/}
{/*
            <li className={this.activeRoute("/dla/school/lessons")}>
            <a href="" className="nav-link nav-dropdown-toggle" onClick={e => this.handleClick(e)}><i className=""></i> School</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/dla/school/lessons/1'} className="nav-link" activeClassName="active"><i className="ms-Icon ms-Icon--CalendarWorkWeek"></i> Lesson 1</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/school/lessons/2'} className="nav-link" activeClassName="active"><i className="ms-Icon ms-Icon--CalendarWorkWeek"></i> Lesson 2</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/school/lessons/3'} className="nav-link" activeClassName="active"><i className="ms-Icon ms-Icon--CalendarWorkWeek"></i> Lesson 3</NavLink>
                </li>
              </ul>
            </li>
*/}
            <li className={this.activeRoute("/dla/support")}>
              <a href="" className="nav-link nav-dropdown-toggle" onClick={e => this.handleClick(e)}><i className=""></i> Support</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/dla/support/docs'} className="nav-link" activeClassName="active"><FabricIcon name="Documentation"/> Documentation</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/support/help'} className="nav-link" activeClassName="active"><i className="ms-Icon ms-Icon--Help"></i> Help</NavLink>
                </li>
              </ul>
            </li>
            <li className={this.activeRoute("/dla/about")}>
{/*
              <a href="" className="nav-link nav-dropdown-toggle" onClick={e => this.handleClick(e)}><i className="ms-Icon ms-Icon--AnalyticsQuery"></i> About</a>
*/}
              <a href="" className="nav-link nav-dropdown-toggle" onClick={e => this.handleClick(e)}><i className=""></i> About</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/dla/about/platform'} className="nav-link" activeClassName="active"><FabricIcon name="GlobalNavButton"/> Platform</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/about/highlights'} className="nav-link" activeClassName="active"><FabricIcon name="AutoEnhanceOn"/> Highlights</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/dla/about/release-notes'} className="nav-link" activeClassName="active"><FabricIcon name="History"/> Release Notes</NavLink>
                </li>
{/*
                <li className="nav-item">
                  <NavLink to={'/dla/about/hall-of-fame'} className="nav-link" activeClassName="active"><FabricIcon name="Teamwork"/> Hall of Fame</NavLink>
                </li>
*/}
                </ul>
            </li>
          </ul>
        </nav>
      </div>
    )
  }

  private handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation()
    e.preventDefault()
    if (e.currentTarget.href) {
//      history.push(e.currentTarget.href)
    }
    e.currentTarget.parentElement.classList.toggle('open')
  }

  private activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

}
