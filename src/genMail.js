const faker = require( 'faker')
const {date,family,office} = require( './lines')
const fs = require( 'fs')
const { ADDRGETNETWORKPARAMS } = require('dns')

const content={
  friend(){
    return {
      subject: faker.hacker.phrase(), 
      content:family[faker.random.number() % 10],
    }
  },
  office(){
    return {
      subject: faker.name.title(),
      content:office[faker.random.number() % 10],
    }
  },
  date(){
    return {
      subject: 'Hi, nice to meet you!',
      content:date[faker.random.number() % 10],
    }
  }
}
function genMail(){  
  const mail = {
    id:faker.random.uuid(),
    from: {
      name:faker.name.findName(),
      mail:faker.internet.email()
    },
    date:faker.date.past(),    
    read:faker.random.boolean(),
    ...content[
      faker.helpers.randomize(Object.keys(content))
    ]()
  }
  
  return mail
} 

function generate(){
  const mails = Array(40).fill(0).map(()=>genMail())
  return mails.sort((a,b)=>b.date-a.date)
}
const mails = generate()
fs.writeFileSync('src/mails.js',`const mails = JSON.parse(\`${JSON.stringify(mails)}\`);
export default mails`)