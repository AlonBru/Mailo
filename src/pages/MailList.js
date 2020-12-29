import React, {useState,useContext} from 'react'
import './stylesheets/mail-list.scss'
import {MailContext} from '../App'
import MailListItem from '../components/MailListItem'
import ToolBar from '../components/Toolbar'

function MailList() {
  const {mails:allMails,setMails:setAllMails} = useContext(MailContext)
  const [mails,setMails] = useState(allMails||[])
  const [search,setSearch] = useState('')
  const unread = mails.filter(mail=>!mail.read)

  function changeRead(id,read){
    const newMails = [...allMails]
    const thisMail = newMails.find(mail=>mail.id===id)
    thisMail.read = !read
    setAllMails(newMails)
  }
  const regex = new RegExp('.*'+search+'.*','i')
  console.log(regex);
  const mailsToDisplay = mails.length&&mails
  .filter( ({
    from:{ name:sender },
     subject,
      content
    } )=>{
      const regex = new RegExp('.*'+search+'.*')
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
<button>GO</button>
    <input className='search'
      value={search}
      placeholder="Search"
      onChange={(e)=>{
        setSearch(e.target.value)
      }}
    />
  </ToolBar>
  <main>
    <content>
      {mailsToDisplay
      ? mailsToDisplay
      :<p> no mails found</p> }
    </content>
  </main>
  </>)
} 
export default MailList; 