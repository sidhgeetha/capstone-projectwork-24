import React from "react";
import { Text, Grid, GridItem, Image } from "@chakra-ui/react";


import { useNavigate } from "react-router-dom";



const AboutUs = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
        <GridItem colSpan={1}>
          <Text>
            OUR STORY We are an independent skincare brand on a mission inspire
            you to embrace your natural beauty & inspire confidence. We
            understand the impact that skin concerns have on mental health &
            well-being as well as the positive impact doing your skincare
            routine can have on depression & anxiety. We create innovative and
            effective customisable skincare using natural, waterless
            formulations that are suitable for all skin types. MEET THE FOUNDER
          </Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Image
            src="https://cdn.pixabay.com/photo/2024/07/07/19/47/ai-generated-8879550_1280.jpg"
            alt="Founder Image"
            borderRadius="lg"
          />
        </GridItem>
      </Grid>
    </div>
  );
};

export default AboutUs;


