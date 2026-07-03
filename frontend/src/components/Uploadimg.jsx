import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Uploadimg(props) {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <div>
       <input type="file" onChange={handleChange} />
            <img src={file} />
    </div>
  )
}

Uploadimg.propTypes = {

}

export default Uploadimg

