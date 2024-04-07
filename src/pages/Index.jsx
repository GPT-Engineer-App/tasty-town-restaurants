import React, { useState } from "react";
import { Box, Heading, Text, Image, Stack, Grid, GridItem, Button, Input, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const restaurants = [
  {
    id: 1,
    name: "Bistro Deluxe",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MHx8fHwxNzEyNDgzMTA4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    rating: 4.5,
    reviews: [
      { id: 1, text: "Great food and ambiance!", rating: 5 },
      { id: 2, text: "Service was a bit slow, but overall good experience.", rating: 4 },
    ],
  },
  {
    id: 2,
    name: "Sushi Haven",
    image: "https://images.unsplash.com/photo-1677632227496-be77ffe5e13d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXJ8ZW58MHx8fHwxNzEyNDgzMTA4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    rating: 4.8,
    reviews: [
      { id: 1, text: "Best sushi in town! Fresh and delicious.", rating: 5 },
      { id: 2, text: "Highly recommended for sushi lovers.", rating: 5 },
    ],
  },
  // Add more restaurants here...
];

const Index = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    onOpen();
  };

  const submitReview = () => {
    if (reviewText.trim() !== "" && reviewRating > 0) {
      const newReview = {
        id: selectedRestaurant.reviews.length + 1,
        text: reviewText,
        rating: reviewRating,
      };
      selectedRestaurant.reviews.push(newReview);
      setReviewText("");
      setReviewRating(0);
      onClose();
    }
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" mb={8}>
        Restaurants in Town
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={8}>
        {restaurants.map((restaurant) => (
          <GridItem key={restaurant.id}>
            <Box borderWidth={1} borderRadius="lg" overflow="hidden" cursor="pointer" onClick={() => openModal(restaurant)}>
              <Image src={restaurant.image} alt={restaurant.name} />
              <Box p={4}>
                <Heading as="h2" size="lg" mb={2}>
                  {restaurant.name}
                </Heading>
                <Stack direction="row" align="center" mb={2}>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <FaStar key={i} color={i < Math.floor(restaurant.rating) ? "gold" : "gray.300"} />
                    ))}
                  <Text ml={2} fontWeight="semibold">
                    {restaurant.rating}
                  </Text>
                </Stack>
                <Text>{restaurant.reviews.length} reviews</Text>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedRestaurant?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRestaurant?.reviews.map((review) => (
              <Box key={review.id} mb={4}>
                <Stack direction="row" align="center" mb={1}>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <FaStar key={i} color={i < Math.floor(review.rating) ? "gold" : "gray.300"} />
                    ))}
                </Stack>
                <Text>{review.text}</Text>
              </Box>
            ))}
            <Box mt={8}>
              <Heading as="h3" size="md" mb={4}>
                Leave a Review
              </Heading>
              <Stack direction="row" align="center" mb={4}>
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <FaStar key={i} color={i < reviewRating ? "gold" : "gray.300"} cursor="pointer" onClick={() => setReviewRating(i + 1)} />
                  ))}
              </Stack>
              <Textarea placeholder="Write your review..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} mb={4} />
              <Button colorScheme="blue" onClick={submitReview}>
                Submit Review
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
