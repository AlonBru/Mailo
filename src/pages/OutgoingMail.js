import React, {useState,useContext} from 'react'
import './stylesheets/mail-list.scss'
import {MailContext} from '../App'
import MailListItem from '../components/OutgoingListItem'
import ToolBar from '../components/Toolbar'

function OutgoingMailList() {
  const {sent} = useContext(MailContext)
  const [mails,setMails] = useState(Object.keys(sent).map(id=>sent[id]))

  return (<>
  <ToolBar>
  </ToolBar>
  <main>
    <content>
      {mails.length
      ? mails.map((mail)=>(
        <MailListItem key={mail.id} mail={mail} />
        
      ))
      :<p> no Mails sent</p> }
    </content>
  </main>
  </>)
} 
export default OutgoingMailList; 