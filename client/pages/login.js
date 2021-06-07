import axios from 'axios'
import React ,{useContext, useState} from 'react'
import { GlobalState } from '../component/GlobalState';
import SearchResult from './SearchResult';
import swal from 'sweetalert';

function login() {
    const initialState={
        email:'',
        password:'',
    }
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [login,setLogin] = useState(initialState)

    const handleChangeInput=e=>{
        const {name,value}=e.target
        setLogin({...login,[name]:value})
    }

   
    const handleSubmit= async e=>{
        e.preventDefault()
       try{
           await axios.post('/api/login',{...login})
           localStorage.setItem('firstLogin',true)
            swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                window.location.href="/create";
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
            <div className="login-container">
                <div className="row">
                    <div className="col-md-12 login-form-2">
                        <h3>Log in</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input name="email" type="email" className="form-control" placeholder="Type your email" value={login.email} 
                                onChange={handleChangeInput}/>
                            </div>
                            <div className="form-group">
                                <input name="password"  autoComplete="on" type="password" className="form-control" placeholder="Type your password" value={login.password}
                                onChange={handleChangeInput}/> 
                            </div>

                            <button type="submit" className="btn btn-warning  btn-sm btn-block"> LOGIN</button>
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

export default login
