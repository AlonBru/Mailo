import React,{useContext} from 'react' 
import {useParams,useHistory} from 'react-router-dom'
import {MailContext} from '../App'
import Toolbar from '../components/Toolbar'
import './stylesheets/SinglePage.scss'
function Mail() {
  const {id} = useParams()
  const mail = useContext(MailContext).mailIndex[id]
  const {from:{name,mail:email},subject,content,date} = mail
  const history = useHistory()
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
} 
export default Mail;
