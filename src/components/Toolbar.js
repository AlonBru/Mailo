import React,{memo} from 'react' 

function App({children}) {
  return(
    <section className="toolbar">
    <topbar></topbar>
      {children}
    </section>
  )

} 
export default memo(App);