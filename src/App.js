import React,{useState,createContext,useMemo} from 'react';
import allMails from './mails'
import './App.scss';
import { BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import {
  MailList,
  Mail,
  ComposeMail,
  OutgoingMailList,
  SentMail,
  Drafts
} from './pages'
import Nav from './components/Nav'

export const MailContext = createContext(allMails)

function App() {
  const [mails,setMails] = useState(allMails)
  const [sent,setSent] = useState({})// indexed by id
  const mailIndex = useMemo(
    ()=>mails.reduce((acc,cur)=>{
      acc[cur.id] = cur;
      return acc
    },{})
    ,[mails]
  )
  return (
    <div className="App">
     <MailContext.Provider value={{mails,setMails,mailIndex,sent,setSent}}>
      <Router>
      <Nav />
        <Switch>
          <Route path='/mail/:id'>
            <Mail/>
          </Route>
          <Route path='/sent/:id'>
            <SentMail/>
          </Route>
          <Route path='/sent'>
            <OutgoingMailList/>
          </Route>
          <Route path='/drafts'>
            <Drafts/>
          </Route>
          <Route path='/compose'>
            <ComposeMail/>
          </Route>
          <Route path='/' >
            <MailList/>
          </Route>
        </Switch>
      </Router>
     </MailContext.Provider>
    </div>
  );
}

export default App;
