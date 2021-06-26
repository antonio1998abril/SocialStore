import React from 'react'
import {Card,ListGroup,ListGroupItem,Button} from 'react-bootstrap' 

function ProductItem({product}) {
    return (
        <>
        <div className="product_card">
        <Card style={{ width: '16rem' }}>
            <Card.Img variant="top" src={product.images.url} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
               {product.description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{product.price}</ListGroupItem>
                <ListGroupItem>{product.content}</ListGroupItem>
                <ListGroupItem> <b>Sold:</b>&nbsp;{product.sold}&nbsp; <b>Category: </b>&nbsp;{product.category}</ListGroupItem>
            </ListGroup>
             <Card.Body>
            <Card.Link href="#"> <Button variant="warning">Buy</Button></Card.Link>
                <Card.Link href="#"> <Button variant="dark">review</Button></Card.Link>
            </Card.Body> 
        </Card>        
        </div>    
        </>
    )
}

export default ProductItem
