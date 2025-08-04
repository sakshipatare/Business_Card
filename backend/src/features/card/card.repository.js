import mongoose from "mongoose";
import { cardSchema } from "./card.schema.js";

const CardModel = mongoose.model("Card", cardSchema);

export default class CardRepository {

  async getAll() {
    try {
      const cards = await CardModel.find();
      return cards;
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching all cards");
    }
  }

  async getByEmail(email) {
  try {
    const card = await CardModel.findOne({ email });
    return card;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching card by email");
  }
}


  async getByID(id) {
  try {
    // optional: validate id is number
    if (typeof id !== 'number') {
      throw new Error("ID must be a number");
    }
    const card = await CardModel.findOne({ id });
    return card;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching card by ID");
  }
    }


  async add(cardData) {
  try {

    // Check if email already exists
    const existingCard = await CardModel.findOne({ email: cardData.email });
    if (existingCard) {
      throw new Error("This data is already added");
    }

    // find max ID
    const maxCard = await CardModel.findOne().sort('-id').exec();
    const nextId = maxCard && typeof maxCard.id === 'number' ? maxCard.id + 1 : 1;

    // add new data
    const newCard = new CardModel({ id: nextId, ...cardData });
    await newCard.save();
    return newCard;
  } catch (err) {
    console.error(err);
    if (err.message === "This data is already added") {
      throw err;
    }
    throw new Error("Error adding card");
  }
}


  async delete(id) {
  try {
    const deletedCard = await CardModel.findOneAndDelete({ id });
    if (!deletedCard) {
      throw new Error(`Card with id ${id} not found`);
    }

    await CardModel.updateMany(
      { id: { $gt: id } },
      { $inc: { id: -1 } }
    );

    return { message: 'Card deleted and IDs updated successfully' };
  } catch (err) {
    console.error(err);
    throw new Error('Error deleting card');
  }
}


  async filter(filterCriteria) {
    try {
      const filteredCards = await CardModel.find(filterCriteria);
      return filteredCards;
    } catch (err) {
      console.error(err);
      throw new Error("Error filtering cards");
    }
  }

  async update(id, updateData) {
  try {
    const updatedCard = await CardModel.findOneAndUpdate(
      { id: id },
      updateData,
      { new: true }  // Return the updated document
    );
    if (!updatedCard) {
      throw new Error(`Card with id ${id} not found`);
    }
    return updatedCard;
  } catch (err) {
    console.error(err);
    throw new Error("Error updating card");
  }
}


}
