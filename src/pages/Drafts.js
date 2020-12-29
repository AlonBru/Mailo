import React, {useContext} from 'react'
import './stylesheets/mail-list.scss'
import {MailContext} from '../App'
import MailListItem from '../components/OutgoingListItem'
import ToolBar from '../components/Toolbar'

function OutgoingMailList() {
  const {sent} = useContext(MailContext)
  const mails = Object.keys(sent).map(id=>sent[id]).filter(mail=>mail.draft)

  return (<>
  <ToolBar>
  </ToolBar>
  <main>
    <content>
      {mails.length
      ? mails.map((mail)=>(
        <MailListItem key={mail.id} mail={mail} />
        
      ))
      :<p> no Drafts saved</p> }
    </content>
  </main>
  </>)
} 
export default OutgoingMailList; 