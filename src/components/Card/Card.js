import React from "react";
import {Card, CardGroup, Button} from "react-bootstrap";
import './Card.css'

function Card2({image,title, author, description}){
    return(
<CardGroup>  
{Array.from({ length: 3 }).map((_, index) => (
        <Card  className={"card-grid"} key={index} style={{ maxWidth: '22rem' }}>
            <Card.Img className="card-img" variant="bottom" src={image} /> 
            <Card.Body style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)'}}>
                <Card.Title className="card__title"><strong>{title}</strong></Card.Title>
                <Card.Subtitle tag="h6" className="card_author">{author}</Card.Subtitle>
                <Card.Text className="card__description">{description}</Card.Text>
                <Button variant="primary"
                        href="www.google.com"
                        rel={"noopener noreferrer"}>
                    Baca SelengkapNya
                </Button>
            </Card.Body>
        </Card>
))}
</CardGroup>
  );
}
export default Card2;