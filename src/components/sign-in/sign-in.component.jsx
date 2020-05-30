import React from 'react';
import './sign-in.style.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth,signInWithGoogle} from '../../firebase/firebase.utils'

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const{email,password}=this.state;

        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email : '' , password : '' });

        }catch(error){
            console.log(error);
            console.log("aman1");
        }

        
    }

    handleChange = event => {
        const {name, value} =event.target;
        this.setState({
            [name] : value
        });
    }

    render(){
        return(
            <div className="sign-in">
                <h2 className="title"> i already had an account </h2>
                <span>sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    
                    <FormInput name="email" handleChange={this.handleChange} 
                    label="email" type="email" value={this.state.email} required />
                    
                    <FormInput name="password" handleChange={this.handleChange}
                    label="password" type="password" value={this.state.password} required />
                    <div className="buttons">
                        
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {' '}
                            Sign in With Google{' '}
                            </CustomButton>
                    </div>
                    
                    
                </form>
            </div>
        );
    }
}

export default SignIn;