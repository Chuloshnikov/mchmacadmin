import React from 'react';
import { BounceLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div>
        <BounceLoader color={"#1F2937"} speedMultiplier={2}/>
    </div>
  )
}

export default Spinner;