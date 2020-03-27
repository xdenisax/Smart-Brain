import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'

const particlesOption = {
  "particles": {
    "number": {
        "value": 80
    },
    "size": {
        "value": 3
    }
  }
}

const app = new Clarifai.App({
  apiKey:'f7a8639bed764de6842c42d1ea7f8c02'
})

class App extends Component {

  constructor(){
    super();
    this.state = {
      input:'',
      imageURL:'',
      box:{},
      route:'signin'
    }
  }

  calculateFaceLocation = (data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height= Number(image.height);
    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width- (clarifaiFace.right_col*width),
      bottomRow: height-(clarifaiFace.bottom_row *height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
  }
  
  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }

  onSubmit = (event) =>{
    this.setState({imageURL:this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response)=> {
      this.displayFaceBox(this.calculateFaceLocation(response))
    }).catch(err => console.log(err));
  }

  onRouteChange =(route) =>{
    this.setState({route:route})
  }
 

  render(){
    const {imageURL, route, box} =this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOption}/>
        {
          this.state.route === 'home' 
          ?<div>
              <div className='top'>
                <Logo/>
                <Navigation onRouteChange = {this.onRouteChange}/>
              </div> 
              <Rank/>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition box={box} imageURL = {imageURL}/>
          </div>
          : ( this.state.route === 'signin' 
              ? <SignIn onRouteChange = {this.onRouteChange}/> 
              : <Register onRouteChange = {this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;