import React from 'react' 
import {NavLink} from 'react-router-dom'

function Nav() {
  return (
    <nav >
      <NavLink to='/compose'
        activeClassName="active"
      >
        <span>
        Compose Mail
        </span>
      </NavLink>
      <NavLink to='/all'
        activeClassName="active"
      >
        <span>
        Inbox
        </span>
      </NavLink>
      <NavLink to='/sent'
        activeClassName="active"
      >
        <span>
        Sent
        </span>
      </NavLink>
      <NavLink to='/drafts'
        activeClassName="active"
      >
        <span>
          Drafts
        </span>
      </NavLink>
      
    </nav>
  )

} 
export default Nav;