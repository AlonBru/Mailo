import React,{memo} from 'react' 
import {useHistory} from 'react-router-dom'

function OutgoingListItem({mail:{to:mail,subject,id,content,date,draft}}) {
  const history = useHistory()
  return (
  <section className={'mail-list'}
    onClick={()=>{
      draft
      ? history.push(`/compose?id=${id}`)
      : history.push(`/sent/${id}`)
    }}
  >
    <span className="icon">{}</span>
    <span className="subject">{subject?subject:'No Subject'} </span>
    <span className="from">To: {mail} </span>
  </section>
  )
} 
export default memo(OutgoingListItem);