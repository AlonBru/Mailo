import React,{useContext} from 'react' 
import {useParams} from 'react-router-dom'
import {MailContext} from '../App'
import Toolbar from '../components/Toolbar'
import './stylesheets/SinglePage.scss'
function Mail() {
  const {id} = useParams()
  const sent = useContext(MailContext).sent[id]
  
  console.log(id)
  console.log(sent)
  if(sent){
    const {to:mail,subject,content,date} = sent
    return (<>
      <Toolbar>
      </Toolbar>
      <main>
        <content className='mail'>
          
        <span className="subject" >
          {subject}
        </span> 
        <span>
          To: <a href={`/compose?to=${mail}`}>{mail}</a>
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
    return   (<>
      <Toolbar>
      </Toolbar>
      <main>
      no mail with Id {id}
    </main>
    </>)
  }
} 
export default Mail;
