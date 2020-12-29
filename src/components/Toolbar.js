import React,{memo} from 'react' 

function App({children}) {
  return(
    <section className="toolbar">
    <p className="logo">
     ✉ Mailo
    </p>
    <span>

      {children}
    </span>
    </section>
  )

} 
export default memo(App);