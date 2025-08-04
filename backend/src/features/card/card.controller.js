import mongoose from "mongoose";
import CardRepository from "./card.repository.js";

export default class CardController {

  constructor() {
    this.cardRepository = new CardRepository();
  }

  async getAllDetails(req, res) {
    try {
      const cards = await this.cardRepository.getAll();
      res.status(200).send(cards);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  async getByEmail(req, res) {
  try {
    const { email } = req.params;
    const card = await this.cardRepository.getByEmail(email);
    if (!card) {
      return res.status(404).send("Card not found");
    }
    res.status(200).send(card);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching card");
  }
}


  async getbyId(req, res) {
    try {
      const { id } = req.params;
      const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return res.status(400).send("Invalid card ID");
        }
      const card = await this.cardRepository.getByID(numericId);
      if (!card) {
        return res.status(404).send("Card not found");
      }
      res.status(200).send(card);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  async addToCard(req, res) {
    try {
      const cardData = req.body;
      const newCard = await this.cardRepository.add(cardData);
      res.status(201).send(newCard);
    } catch (err) {
      console.error(err);
      if (err.message === "This data is already added") {
      return res.status(400).send(err.message);
    }
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteCard(req, res) {
    try {
      const { id } = req.params;
      const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return res.status(400).send("Invalid card ID");
        }
      const result = await this.cardRepository.delete(numericId);
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  async filterCards(req, res) {
    try {
      const filterCriteria = req.body; // or req.query for GET-based filters
      const filteredCards = await this.cardRepository.filter(filterCriteria);
      res.status(200).send(filteredCards);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateCard(req, res) {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).send("Invalid card ID");
    }
    const updateData = req.body;
    const updatedCard = await this.cardRepository.update(numericId, updateData);
    res.status(200).send(updatedCard);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

}
