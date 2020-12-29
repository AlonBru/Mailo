import {memo} from 'react' 
import NoMailIcon from './svgs/noMail.svg'
function NoMail({text}) {
return (<>
  <main>
    <content className="noFound">
      <h2> {text} </h2>
      <img
        src={NoMailIcon}
        alt={'No Mail'}
      />
    </content>
  </main>
</>)

} 
export default memo(NoMail);