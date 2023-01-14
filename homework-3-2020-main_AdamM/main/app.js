const express = require("express");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "my.db",
});

let FoodItem = sequelize.define(
  "foodItem",
  {
    name: Sequelize.STRING,
    category: {
      type: Sequelize.STRING,
      validate: {
        len: [3, 10],
      },
      allowNull: false,
    },
    calories: Sequelize.INTEGER,
  },
  {
    timestamps: false,
  }
);

const app = express();
// TODO

app.get("/create", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    for (let i = 0; i < 10; i++) {
      let foodItem = new FoodItem({
        name: "name " + i,
        category: ["MEAT", "DAIRY", "VEGETABLE"][Math.floor(Math.random() * 3)],
        calories: 30 + i,
      });
      await foodItem.save();
    }
    res.status(201).json({ message: "created" });
  } catch (err) {
    console.warn(err.stack);
    res.status(500).json({ message: "server error" });
  }
});

app.get("/food-items", async (req, res) => {
  try {
    let foodItems = await FoodItem.findAll();
    res.status(200).json(foodItems);
  } catch (err) {
    console.warn(err.stack);
    res.status(500).json({ message: "server error" });
  }
});

app.use(express.json());

app.post("/food-items", async (req, res) => {
  try {
    // TODO

    const { name, calories, category } = req.body;
    if (!req.body) {
      return req.status(400).send({ message: "body is missing" });
    }

    if (name || category || calories) {
      return res.status(400).send({ message: "malformed request" });
    }

    if (calories < 0) {
      return res
        .status(400)
        .send({ message: "calories should be a positive number" });
    }

    if (category.length < 3 || category.length > 10) {
      return res.status(400).send({ message: "not a valid category" });
    }

    return res.status(201).send({ message: "created" });
  } catch (err) {
    // TODO
  }
});

module.exports = app;
