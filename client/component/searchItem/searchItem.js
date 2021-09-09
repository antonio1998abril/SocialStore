import React, { useState } from 'react'
import {Card,Modal,Button,Image} from 'react-bootstrap' 
import Link from 'next/link';

function searchItem({service}) {
  const result = service.hasOwnProperty('images')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
        <>
        {/*
            <Card
              bg="info" 
            text='dark'
            className="mb-2 resultcard">
            <Card.Header className="itemcardSearch">{service.title ? service.title : service.name ? service.name :service.companyName}</Card.Header>
                <Card.Body>
                    <Card.Title>Card Title </Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                 </Card.Body>
        </Card> */}


            <div className="container">
{/* <div className="row">
  <div className="col-md-4">
    <a className="datcard my-3" href="/AuburnAnswers/Admin/ManageCategory">
      <span style={{color:"white"}} className="h4">Manage Categories</span>
      <p>Click here to go to the manage categories page.</p>
      <div className="go-corner">
      </div>
    </a>
  </div>
</div> */}

  <div className="row">
    <div className="col-md-12 ">
            <div className="wrimagecard wrimagecard-topimage">
              <div className="wrimagecard-topimage_header">
               {/*  <i className="fas fa-users cardIcon"></i> */}
              </div>
              <div className="wrimagecard-topimage_title h-140">
                <h4 className="text-center">
                {service.title ? service.title : service.name ? service.name :service.companyName ? service.companyName: service.categoryName ? service.categoryName : service.portName}
                </h4>
                <p className="textbodysearch"> {service.description ? service.description : service.email ? service.email :service.ubication ? service.ubication: service.companyEmail ? service.companyEmail : service.description}</p>
             
              </div>
              <div className="card-action-bar">
{/*                 {
                  result ? <React.Fragment>
                  <a className="float-lg-none link">Image</a>
                  <a className="float-lg-none link">View Staff</a>
                  </React.Fragment> :
                  <a className="float-lg-none link">View Staff</a>
                } */}
                {
                  result ? 
                  <React.Fragment>
                      <Link  href="/detailSearchGlobal/[detailSearch]" as={`/detailSearchGlobal/${service._id}`}>
                          <a className="float-lg-none link" > See</a>
                      </Link>
                   
                      <a className="float-lg-none link" onClick={handleShow}>
                         Image
                      </a>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                        <Image  variant="top" src={service.images.url} style={{ width: '100%' }} thumbnail fluid/>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>

                  </React.Fragment> :
                      <Link href="/detailSearchGlobal/[detailSearch]" as={`/detailSearchGlobal/${service._id}`}>
                        <a className="float-lg-none link" > See</a>
                      </Link>
                }
              </div> 
            </div>
          </div>
        </div>
      </div>
      
        </>
    )
}

export default searchItem
