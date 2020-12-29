import React,{useState} from 'react' 
import {NavLink} from 'react-router-dom'

function Nav() {
  return (
    <nav >
      <NavLink to='/all'
        activeClassName="active"
      >
        <span>
        Incoming Mail
        </span>
      </NavLink>
      <NavLink to='/sent'
        activeClassName="active"
      >
        <span>
        Outgoing Mail
        </span>
      </NavLink>
      <NavLink to='/drafts'
        activeClassName="active"
      >
        <span>
          Drafts
        </span>
      </NavLink>
      <NavLink to='/compose'
        activeClassName="active"
      >
        <span>
        Compose Mail
        </span>
      </NavLink>
    </nav>
  )

} 
export default Nav;