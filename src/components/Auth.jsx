import { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { auth } from '../firebase.js'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const Auth = () => {
    const navigate = useNavigate()
    const [email, setEmail] =  useState("")
    const [password, setPassword] = useState("")

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password)
            .then(auth => {
                console.log(auth)
                navigate('/')
            }).catch(error => alert(error.message))
    }
    const register = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then(auth => {
                console.log(auth)
                if(auth){
                    navigate('/')
                }
        }).catch(error => {
            alert(error.message)
        })
    }
    return (
        <div className="h-screen flex flex-col items-center">
            <Link to="/">
            <img
                 className="my-5 mx-auto object-contain w-[100px]"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                 alt="logo"
            />
            </Link>
            <div className="w-[300px] flex flex-col p-5 border border-gray-300 rounded-[5px]">
                  <h2 className='font-medium mb-5 p-2.5'>Sign In</h2>
                  <form>
                      <label className="block mb-1.5">Email</label>
                      <input
                          className='h-[30px] mb-2.5 bg-white w-[98%] border border-gray-300 px-2'
                          onChange={handleEmailChange}
                          type="text"
                          value={email}
                      />
                      <label className="block mb-1.5">Password</label>
                      <input
                             className='h-[30px] mb-2.5 bg-white w-[98%] border border-gray-300 px-2'
                             onChange={handlePasswordChange}
                             type="password"
                             value={password} />
                      <button
                          onClick={signIn}
                          className="login_signInButton"
                          type="submit">Sign in</button>
                  </form>
                <p className='mt-4 text-xs'>
                    By signing-in you agree to Amazon clone's Conditions of Use and Sale. Please see our Privacy Notice,
                    our Cookies Notice and our Interest-Based Ads Notice..'
                </p>
                <button
                    onClick={register}
                    className="bg-[#f0c14b] rounded-sm w-full h-[30px] border mt-2.5
         border-[#a88734] border-b-[#846a29] border-r-[#9c7e31]"
                    type="submit">Create your Amazon Account</button>
            </div>
        </div>
    )
}
export default Auth
