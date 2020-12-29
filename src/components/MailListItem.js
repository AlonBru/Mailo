import React,{memo} from 'react' 
import {useHistory} from 'react-router-dom'
import Read from './svgs/read.svg'
import Unread from './svgs/unread.svg'
import Reply from './svgs/reply.svg'

function formatDate(str){
  const date = new Date(str)
  return (date  > Date.now() - 24*60*60*100 )
  ? date.toTimeString()
  : date.toDateString().slice(4)
}
function MailListItem({mail:{from:{mail,name},subject,id,text,date,read},changeRead}) {
  const history = useHistory()
  
  const initials = name
  .split(' ')
  .map(name=>name.slice(0,1))
  .join('')

  return (
  <section className={'mail-list '+(read?'read':'')}
    onClick={()=>{
      if(!read){ 
       changeRead(id,read)
      }
      history.push(`/mail/${id}`)
    }}
  >
    <span className="icon">{initials}</span>
    <h4 
    long={subject.length>41?'long':'not'} 
    title={subject}
    className="subject" >{subject?subject:'No Subject'} </h4>
    <span className="from" >{`from: ${name} ( ${mail} )`}  </span>
    <span className="date" >{formatDate(date)} </span>
    
    <section className="buttons">
      <img className='read-button'
        src={read?Read:Unread}
        title={`mark as ${read?'unread':'read'}`}
        alt={`${read?'read':'unread'} `}
        onClick={(e)=>{
          e.stopPropagation()
          changeRead(id,read)
        }}
      />

      <img className='reply-button'
        src={Reply}
        title={`reply`}
        alt={'REPLY'}
        onClick={(e)=>{
          e.stopPropagation()
          history.push(`/compose?id=${id}&reply=true`)
        }}
      />
    </section>
  </section>
  )
} 
export default memo(MailListItem);