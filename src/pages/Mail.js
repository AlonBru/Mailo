import React,{useContext} from 'react' 
import {useParams,useHistory} from 'react-router-dom'
import {MailContext} from '../App'
import Toolbar from '../components/Toolbar'
import NoMail from '../components/NoMail'
import './stylesheets/SinglePage.scss'
function Mail() {
  const {id} = useParams()
  const history = useHistory()
  const mail = useContext(MailContext).mailIndex[id]
  if(mail){
    const {from:{name,mail:email},subject,content,date} = mail
    return (<>
      <Toolbar>
      <button className='reply-button'
        onClick={(e)=>{
          e.stopPropagation()
          history.push(`/compose?id=${id}&reply=true`)
        }}
      > REPLY </button>
      </Toolbar>
      <main >
        <content className='mail' >
          
        <span className="subject" >
          {subject}
        </span> 
        <span>
          From: {name} ( <a href={`/compose?to=${email}`}>{email}</a> )
        </span> 
        <span>
          Sent: {new Date(date).toUTCString()}
        </span> 
        

        <textarea name='content'
        value={content}
        disabled
        rows="10"
        type='text'/>
        </content>
      </main>
    </>)
  }else{
    return (<>
      <Toolbar/>
      <NoMail text={`no mail found with Id ${id}`} ></NoMail>
    </>)
  } 
} 
export default Mail;
