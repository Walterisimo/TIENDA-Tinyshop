import React from 'react'

const uniqueIdGenerator = () => {
  
  const guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  console.log(guid());
  //"c2181edf-041b-0a61-3651-79d671fa3db7"
  
  return (
    guid()
  )
}

export default uniqueIdGenerator