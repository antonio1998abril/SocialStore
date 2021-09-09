import React from 'react'
import {Card,ListGroup,ListGroupItem,Button} from 'react-bootstrap' 
import Link from 'next/link';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag} from '@fortawesome/free-solid-svg-icons'

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
                <ListGroupItem> <b>Sold:</b>&nbsp;{product.sold}&nbsp; </ListGroupItem>
                <ListGroupItem> <b>Category: </b>&nbsp;{product.category}</ListGroupItem>
            </ListGroup>
             <Card.Body>
            <Link href="/detailSearchGlobal/[detailSearch]" as={`/detailSearchGlobal/${product._id}`}> 
             <Button variant="warning">
             <FontAwesomeIcon icon={faShoppingBag } style={{color: "white"}} inverse transform="shrink-2" size = '2x'  />
            </Button> 
            
       
                
            </Link>

               {/*  <Card.Link href="#"> <Button variant="dark">review</Button></Card.Link> */}
            </Card.Body> 
        </Card>        
        </div>    
        </>
    )
}

export default ProductItem
