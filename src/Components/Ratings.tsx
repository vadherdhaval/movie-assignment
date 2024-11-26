// Filename - components/Rating.js

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Rating } from "./StarRating";
const Ratings = (props:any) => {
    const {overallRating} = props;
    return (
        <Container>{[...Array(10)].map((item, index) => {
        const givenRating = index + 1;
        return (
            <Rating key={index}>
                <FaStar
                    color={
                        givenRating < overallRating || givenRating === overallRating
                            ? "#ffd602"
                            : "rgb(192,192,192)"
                    }
                />
            </Rating>
        );
    })}
    </Container>
    )
};

export default Ratings;