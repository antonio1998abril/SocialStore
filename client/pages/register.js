import axios from 'axios'
import React, {useContext, useState} from 'react'
import swal from 'sweetalert'
import { GlobalState } from '../component/GlobalState'
import SearchResult from './SearchResult'

const initialState={
    name:'',
    lastname:'',
    service:'',
    tel:'',
    email:'',
    password:'',
    repeat:''
}

function register() {
    const [register,setRegister] = useState(initialState)
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged

    const handleChangeInput=e=>{
        const {name,value}=e.target
        setRegister({...register,[name]:value})
    }   
    const handleSubmit=async e=>{
       e.preventDefault()
       try{
            await axios.post('/api/register',{...register})
            localStorage.setItem('firstLogin',true) 
            swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                window.location.href="/";
            },2000)
            
       }catch(err){
        swal({
            title:"ERROR",
            text: err.response.data.msg,
            icon:"error",
            button:"OK"
        })
       }
    }

    if(islogged){
        return <SearchResult/>
    } 
    return (
        <>
        <div >
            <div className="register-container">
                <div className="row">
                    <div className="col-md-12 register-form-2">
                        <h3>Sign Up</h3>
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="form-group size">
                                <input name="email" type="email" className="form-control" placeholder="Email" value={register.email} 
                                onChange={handleChangeInput}/>
                            </div>
                            <div className="form-group size">
                                <input name="password"  autoComplete="on" type="password" className="form-control" placeholder="Password" value={register.password}
                                onChange={handleChangeInput}/> 
                            </div>
                            <div className="form-group size">
                                <input name="repeat"  autoComplete="on" type="password" className="form-control" placeholder="Type again your password" value={register.repeat}
                                onChange={handleChangeInput}/> 
                            </div> 

                            <br></br>
                            <div className="form-group size">
                                <input name="name"  autoComplete="on" type="text" className="form-control" placeholder="Name" value={register.name}
                                onChange={handleChangeInput}/> 
                            </div>
                            <div className="form-group size">
                                <input name="lastname"  autoComplete="on" type="text" className="form-control" placeholder="Lastname" value={register.lastname}
                                onChange={handleChangeInput}/> 
                            </div>
                            <div className="form-group size">
                                <input name="service"  autoComplete="on" type="textarea" className="form-control" placeholder="Type your service" value={register.bussinessservice}
                                onChange={handleChangeInput}/> 
                            </div>
                            <div className="form-group size">
                                <input name="tel"  autoComplete="on" type="tel" className="form-control" placeholder="Type your Telephone" value={register.tel}
                                onChange={handleChangeInput}/> 
                            </div>
                            <button type="submit" className="btn btn-warning  btn-sm btn-block "> Register</button>
                        {/*     <div className="form-group">
                                <input type="submit" className="btnSubmit" value="Login" />
                            </div> */}
                      
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default register
