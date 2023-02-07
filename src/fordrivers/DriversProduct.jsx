import React from 'react'
import DriversSee from './DriversSee'

export default function DriversProduct({driver}) {
  
return driver.map((driver) =>(
    <DriversSee key={DriversSee.ID} driver={driver} />
))


}
