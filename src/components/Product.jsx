import React from 'react'

import UserCall from './UserCall'

export default function Product({test}) {
  
return test.map((userCall) =>(
    <UserCall key={UserCall.ID} userCall={userCall}  /> 
))


}
