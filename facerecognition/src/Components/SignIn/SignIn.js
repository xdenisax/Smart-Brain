import React from 'react'
import axios from 'axios'

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail:"",
            signInPassword:""
        }
    }
    onEmailChange = (event)=>{
        this.setState({signInEmail:event.target.value});
    }

    onPasswordChange = (event)=>{
        this.setState({signInPassword:event.target.value});
    }

    onSubmitSignInEvent = async () =>{
        console.log("fetch starts")

        // let response = await axios.post('http://localhost:5000/signin', {
        //     email: this.state.signInEmail,
        //     password: this.state.signInPassword
        // },{
        //       headers: { "content-type": "application/json" }
        //   });
        //   console.log(response);
          
        // axios.post('http://localhost:5000/signin', {
        //     email: this.state.signInEmail,
        //     password: this.state.signInPassword
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

          axios.post('http://localhost:5000/', {
            email: this.state.signInEmail,
            password: this.state.signInPassword
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        // fetch('http://localhost:5000/signin',{
        //     method: 'POST',
        //     header:{
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     body: JSON.stringify({
        //         email: this.state.signInEmail,
        //         password: this.state.signInPassword
        //     })
        // }).then(response=>{
        //     return response.json();
        // }).catch(err=>console.log(err))
        // .then(data =>{
        //     console.log(data);
        //     // if(data==="succes")
        //     //     this.props.onRouteChange('home');
        // });

        // axios({
        //     method: 'post',
        //     url: 'http://localhost:5000/signin',
        //     data: {
        //         email: this.state.signInEmail,
        //         password: this.state.signInPassword
        //     },
        //     validateStatus: (status) => {
        //       return true; 
        //     },
        //   }).catch(error => {
        //       console.log(error);
        //   }).then(response=>{
        //         return response.json();
        //   }).then(data =>{
        //         console.log(data);
        //         // if(data==="succes")
        //         //     this.props.onRouteChange('home');
        //   });

        console.log('sdfs',this.state.signInEmail, this.state.signInPassword)
    }
    render(){
        const {onRouteChange} = this.props;
        return(
            <div>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange= {this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"/>
                                </div>
                            </fieldset>
                            <div className="">
                                <input 
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Sign in"
                                    onClick = {this.onSubmitSignInEvent}/>
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={()=>onRouteChange('register')} href="#0" className="f6 link dim black db pointer" >Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default SignIn;