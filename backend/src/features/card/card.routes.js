import express from "express";
import CardController from "./card.controller.js";

const cardRouter = express.Router();
const cardController = new CardController();

// Get all cards
cardRouter.get('/', (req, res) => {
  cardController.getAllDetails(req, res);
});

// ⚠️ Add this line BEFORE `/:id` route
cardRouter.get('/email/:email', (req, res) => {
  cardController.getByEmail(req, res);
});

// Get card by ID
cardRouter.get('/:id', (req, res) => {
  cardController.getbyId(req, res);
});

// Add new card
cardRouter.post('/add', (req, res) => {
  cardController.addToCard(req, res);
});

// Delete card by ID
cardRouter.delete('/:id', (req, res) => {
  cardController.deleteCard(req, res);
});

// Filter cards
cardRouter.post('/filter', (req, res) => {
  cardController.filterCards(req, res);
});

cardRouter.put('/:id', (req, res) => {
  cardController.updateCard(req, res);
});


export default cardRouter;
