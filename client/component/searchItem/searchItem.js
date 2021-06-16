import React from 'react'
import {Card} from 'react-bootstrap' 

function searchItem({service}) {
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
    <div className="col-md-12 col-lg-12">
            <div className="wrimagecard wrimagecard-topimage">
              <div className="wrimagecard-topimage_header">
                <i className="fas fa-users cardIcon"></i>
              </div>
              <div className="wrimagecard-topimage_title h-140">
                <h2 className="h4 text-center">
                {service.title ? service.title : service.name ? service.name :service.companyName}
                </h2>
                <p>Contains the list of staff members for The Big Event.</p>
              </div>
{/*               <div className="card-action-bar">
                <a className="float-lg-none link">View Staff</a>
              </div> */}
            </div>
          </div>

  </div>
  
</div>
        </>
    )
}

export default searchItem
