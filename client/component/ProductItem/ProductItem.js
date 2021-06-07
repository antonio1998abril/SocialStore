import React from 'react'
import {Card,ListGroup,ListGroupItem,Button} from 'react-bootstrap' 

function ProductItem() {
    return (
        <>
        <div className="product_card">
        <Card style={{ width: '16rem' }}>
            <Card.Img variant="top" src="https://static.dw.com/image/53823423_101.jpg" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.cxccdcds Some quick example text to build on the card title and make up the bulk of
                the card's content  Some quick example text to build on the card title and make up the bulk of
                the card's content  Some quick example text to build on the card title and make up the bulk of
                the card's content
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
            <Card.Body>
            <Card.Link href="#"> <Button variant="warning">Buy</Button></Card.Link>
                <Card.Link href="#"> <Button variant="dark">review</Button></Card.Link>
            </Card.Body>
        </Card>        
        </div>

        <div className="product_card">
        <Card style={{ width: '16rem' }}>
            <Card.Img variant="top" src="https://static.dw.com/image/53823423_101.jpg" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Vestibuluexample text to buidssdssdld on the card m at eros</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>        
        </div>
    
        </>
    )
}

export default ProductItem
