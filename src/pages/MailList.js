import React, {useState,useContext} from 'react'
import './stylesheets/mail-list.scss'
import {MailContext} from '../App'
import MailListItem from '../components/MailListItem'
import Toolbar from '../components/Toolbar'
import NoMail from '../components/NoMail'

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
  <Toolbar>
    <span className='unread'>
      you have {unread.length} unread messages
    </span>
    <input className='search'
      value={search}
      placeholder="Search"
      onChange={(e)=>{
        setSearch(e.target.value)
      }}
    />
  </Toolbar>
  <main>
    <content className="contents">
      {mailsToDisplay.length
      ? mailsToDisplay
      :<NoMail text={"no Mails found"+(mails?` with search term ${search}`:'')}/>}
    </content>
  </main>
  </>)
} 
export default MailList; 