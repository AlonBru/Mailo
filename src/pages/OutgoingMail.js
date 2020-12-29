import React, {useContext} from 'react'
import './stylesheets/mail-list.scss'
import {MailContext} from '../App'
import MailListItem from '../components/OutgoingListItem'
import Toolbar from '../components/Toolbar'
import NoMail from '../components/NoMail'

function OutgoingMailList() {
  const {sent} = useContext(MailContext)
  const mails= Object.keys(sent).map(id=>sent[id]).filter(mail=>!mail.draft)

  return (<>
  <Toolbar>
  </Toolbar>
  <main>
    <content>
      {mails.length
      ? mails.map((mail)=>(
        <MailListItem key={mail.id} mail={mail} />
        
      ))
      :<NoMail text=" no Mails sent"/> }
    </content>
  </main>
  </>)
} 
export default OutgoingMailList; 