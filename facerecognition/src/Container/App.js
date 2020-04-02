import React, { Component } from 'react';
import './App.css';
import Navigation from '../Components/Navigation/Navigation'
import Logo from '../Components/Logo/Logo'
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm'
import Rank from '../Components/Rank/Rank'
import FaceRecognition from '../Components/FaceRecognition/FaceRecognition'
import SignIn from '../Components/SignIn/SignIn'
import Register from '../Components/Register/Register'
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import axios from 'axios'

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



const initalState={
  input:'',
  imageURL:'',
  box:{},
  route:'signin', 
  isSigedIn:false,
  user: {
        id:'',
        name:'',
        email: '',
        entries:0,
        joined:""
  }
}
class App extends Component {

  constructor(){
    super();
    this.state = initalState;
  }

  loadUser= (data)=>{
    this.setState(
      {
        user:
          {
            id:data.id,
            name:data.name,
            email: data.email,
            entries:data.entries,
            joined:data.joined
          }
    });
  }

  calculateFaceLocation = (data)=>{
    const clarifaiFace = data.data.outputs[0].data.regions[0].region_info.bounding_box;
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
    axios.post('http://localhost:5000/imageURL', {input:this.state.input})
    .then((response)=> {
      if(response){
          axios.put('http://localhost:5000/image',{
            id:this.state.user.id
          })
          .then(count=>{
            this.setState(Object.assign(this.state.user, { entries: count.data}));
          })
          .catch(console.log);
      }
      console.log(response)
      this.displayFaceBox(this.calculateFaceLocation(response))
    }).catch(err => console.log(err));
  }

  onRouteChange =(route) =>{
    if(route==='signin'){
      this.setState(initalState);
    }else if (route==='home'){
      this.setState({isSigedIn:true});
    }
    this.setState({route:route});
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
              <Rank 
                name = {this.state.user.name}
                entries = {this.state.user.entries}
              />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition box={box} imageURL = {imageURL}/>
          </div>
          : ( this.state.route === 'signin' 
              ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> 
              : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
