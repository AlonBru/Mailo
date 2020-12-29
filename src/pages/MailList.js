import React, {useState,useContext} from 'react'
import './stylesheets/mail-list.scss'
import {MailContext} from '../App'
import MailListItem from '../components/MailListItem'
import ToolBar from '../components/Toolbar'

function MailList() {
  const {mails:allMails,setMails:setAllMails} = useContext(MailContext)
  const mails =allMails||[]
  const [search,setSearch] = useState('')
  const unread = mails.filter(mail=>!mail.read)

  function changeRead(id,read){
    const newMails = [...allMails]
    const thisMail = newMails.find(mail=>mail.id===id)
    thisMail.read = !read
    setAllMails(newMails)
  }
  const mailsToDisplay = mails.length&&mails
  .filter( ({
    from:{ name:sender },
     subject,
      content
    } )=>{
      const regex = new RegExp('.*'+search+'.*','i')
    return (
      sender.match(regex) ||
      content.match(regex) ||
      subject.match(regex)
      )
  })
  .map((mail)=>(
    <MailListItem key={mail.id} mail={mail} changeRead={changeRead} />
    
  ))

  return (<>
  <ToolBar>
    <span>
      you have {unread.length} unread messages
    </span>
    <input className='search'
      value={search}
      placeholder="Search"
      onChange={(e)=>{
        setSearch(e.target.value)
      }}
    />
  </ToolBar>
  <main>
    <content className="contents">
      {mailsToDisplay.length
      ? mailsToDisplay
      :<h2> no mails found</h2> }
    </content>
  </main>
  </>)
} 
export default MailList; 