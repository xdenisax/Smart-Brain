import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({box, imageURL}) =>{
    return(
        <div className="absolute mt2 center">
            <img id= 'inputImage' className="center" alt="" src={imageURL} width='300px' height='auto'/>
            <div className='bounding-box' style={{top:box.topRow, right: box.topRow, bottom: box.bottomRow, left: box.leftCol}}></div>
        {console.log(box)}
        </div>
    );
}

export default FaceRecognition;