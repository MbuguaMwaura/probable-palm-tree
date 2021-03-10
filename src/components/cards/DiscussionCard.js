import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { Card, CardBody, Row, Col } from "reactstrap";

const DiscussionCard = (props) => {
  return (
    <Card style={{ width: "100%", marginBottom: "1em" }}>
      <CardBody>
        <Row>
          <Col className="col-4">
            {props.photoUrl ? (
              <img
                style={{ width: "auto", height: "240px" }}
                src={props.photoUrl}
                alt=""
                srcset=""
              />
            ) : (
              ""
            )}
            
          </Col>

          <Col className="col-8">
            <h2 style={{fontWeight:"800"}}>{props.discussiontopic}</h2>
            <p style={{fontSize:"16px",fontWeight:"300"}}>{props.creatorName}</p>
            <p style={{overflow: "hidden",whiteSpace: "nowrap",width: "350px",textOverflow: "ellipsis" ,maxHeight: "100px",transition: "max-height 0.4s ease"
}}>{props.discussiondescription}</p>
            <Row style={{marginTop: "1em", marginBottom: "1em"}}>
              <Col>
                  <FontAwesomeIcon icon={faHeart} style={{color:"#FF3302", fontSize:"18px"}} />
                  <p style={{ marginTop: "5px", color:"#6C757D"}}>{props.discussionlikes} Likes</p>
              </Col>
              <Col>
               <FontAwesomeIcon icon={faCommentDots} style={{color:"#696969", fontSize:"18px"}}/>
                <p style={{ marginTop: "5px", color:"#6C757D"}}>{props.discussioncomments} Comments</p>
              </Col>
            </Row>
            <Row>
            {/* <h6>Tags:</h6> */}
            </Row>
            <Row style={{marginLeft:"1px"}}>
            {  
            props.discussiontags.map((tag) => (
                <p style={{borderRadius: "1px", backgroundColor: "#9CCA39", marginRight: "10px", color: "#ffffff", padding: "5px"}}>{tag}</p>
              ))
            }
           
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default DiscussionCard;
