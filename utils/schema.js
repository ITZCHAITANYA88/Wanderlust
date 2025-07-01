// utils/schema.js
const Joi = require("joi");

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
  }).required()
});

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.object({
      url: Joi.string(),
      filename: Joi.string()
    })
  }).required()
});

module.exports = { reviewSchema, listingSchema };
