import React from 'react'
import PendingSee from './PendingSee'

export default function PendingProduct({driver}) {
  
return driver.map((driver) =>(
    <PendingSee key={PendingSee.ID} driver={driver} />
))


}
