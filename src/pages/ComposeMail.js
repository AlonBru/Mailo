import React,{useState, useContext, useRef} from 'react' 
import {useLocation,useHistory} from 'react-router-dom'
import {MailContext} from '../App'
import Toolbar from '../components/Toolbar'
import './stylesheets/compose.scss'
import faker from 'faker'

function formatResponse({from,date,content,subject}){
  return `
___________________________________
From: ${from.name}
Sent: ${new Date(date).toUTCString()}
Subject: ${subject} 
${content}`
} 

function ComposeMail() {
  const query = new URLSearchParams(useLocation().search)
  const [id,reply,sendTo] = [
    query.get('id'),
    query.get('reply'),
    query.get('to'),
  ]
  const {mails,sent,setSent} = useContext(MailContext)

  function getPrevMail (){
    if(reply==='true'){
      const prev = mails.find((mail)=>mail.id===id)
      return {
        to: prev.from.mail,
        subject: 'Re: '+prev.subject,
        content: formatResponse(prev)
      } 
    } else if( id ) {
      return sent[id]
    } else {

      return {to:sendTo}
    }
  } 
  const ref =useRef()
  const history =useHistory()
  
  const [mail,setMail] = useState(getPrevMail())

  console.log(id)

  const {id:mailId,to,subject,content} = mail

  function send (e){
    e.preventDefault()
    const newSent = {...sent}
    if(mailId){
      newSent[mailId] = mail
    }else{
      let newId = faker.random.uuid() 
      while (newId in sent){
        newId = faker.random.uuid()
      }  
      mail.id = newId
      mail.date = new Date().toJSON()
      newSent[newId] = mail
    }
    if (mail.draft){
      delete mail.draft
    }
    setSent(newSent)
    history.push(`/sent`)
  }
  function save (e){
    const newSent = {...sent}
    mail.draft = true
    if(mailId){
      newSent[mailId] = mail
    }else{
      let newId = faker.random.uuid() 
      while (newId in sent){
        newId = faker.random.uuid()
      }  
      mail.id = newId
      newSent[newId] = mail
    }
    console.log(mail)
    setSent(newSent)
    history.push(`/drafts`)
  }
  function cancel (e){
    history.goBack()
  }
  function change ({target:{name,value}}){
    const newMail = {...mail}
    newMail[name] = value
    setMail(newMail)
  }
  console.log(ref)
  
  return (<>
  <Toolbar >
  <button name="send" 
    type="submit"
    onClick={(e)=>{
      console.log(mail)
      send(e)
    }}
  >
    SEND
  </button>
  <button name="save"
  type="button"
  onClick={save}
  >
    SAVE DRAFT
  </button>
  <button name="cancel"
  type="button"
  onClick={cancel}
  >
    CANCEL
  </button>
  </Toolbar>

  <main className='new-mail'>
    <form
      ref={ref} 
      autoComplete='off'
      onSubmit={send}
    >
      <label>
        To:
        <input name="to"
        required
        type="email"
        value={to}
        onChange={change}
        />
      </label> 
      
      <input name="subject"
      className="details"
      onChange={change}
      value={subject}
      placeholder='Subject' />

      <textarea name='content'
      value={content}
      rows="10"
      onChange={change}
      type='text'/>
    </form>
  </main>
  </>)
} 
export default ComposeMail;