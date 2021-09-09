import React, { useContext } from 'react'
import { GlobalState } from '../../../component/GlobalState';
import {Form,Col,Button} from 'react-bootstrap' 
import Login from '../../login';

function configperfil() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [info] = state.User.perfilInfo

    console.log(info)
if(!islogged){
    return <Login/>
}
    return (
       <>
        <main className="content">
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder={info.email} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Pass</Form.Label>
                    <Form.Control type="password" placeholder="Set a New Password" />
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridPassword2">
                    <Form.Label>Repeat  Pass</Form.Label>
                    <Form.Control type="password" placeholder="Repeat New Password" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control placeholder={info.name} />
                </Form.Group>

                <Form.Group  controlId="formGridAddress2">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder={info.lastname}/>
                </Form.Group>


                <Form.Row>
                    <Form.Group as={Col} controlId="formGridTel">
                    <Form.Label>My TEL</Form.Label>
                    <Form.Control placeholder={info.tel}/>
                    </Form.Group>

                    <Form.Group  as={Col} controlId="formGridAddress4">
                    <Form.Label>Service</Form.Label>
                    <Form.Control placeholder={info.service} />
                    </Form.Group>

                    <Form.Group  as={Col} controlId="formGridAddress3">
                    <Form.Label>Ocupation</Form.Label>
                    <Form.Control placeholder={info.ocupation} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Company</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                    </Form.Group>


                </Form.Row>

          

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </main>
       </>
    )
}

export default configperfil
