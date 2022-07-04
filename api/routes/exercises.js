const router = require("express").Router();
const Exercise = require("../models/Exercise");

//ADD EXERCISE
router.post("/", async (req, res) => {
  const newExercise = new Exercise(req.body);
  try {
    const savedExercise = await newExercise.save();
    res.status(200).json(savedExercise);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET EXERCISES
router.get("/", async (req, res) => {
  try {
    const { page } = req.query;

    const LIMIT = 16;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Exercise.countDocuments({});

    const exercises = await Exercise.find().limit(LIMIT).skip(startIndex);

    res.status(200).json({
      data: exercises,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET EXERCISE BY SEARCH
router.get("/search", async (req, res) => {
  try {
    const { searchQuery, bodyPart, target } = req.query;

    const name = new RegExp(searchQuery, "i");

    let exercises;

    if (name && bodyPart && bodyPart !== "all" && target && target !== "all") {
      exercises = await Exercise.find({
        $and: [{ name }, { bodyPart }, { target }],
      });
    } else if (name && bodyPart && bodyPart !== "all") {
      exercises = await Exercise.find({
        $and: [{ name }, { bodyPart }],
      });
    } else if (name && target && target !== "all") {
      exercises = await Exercise.find({
        $and: [{ name }, { target }],
      });
    } else if (bodyPart && bodyPart !== "all" && target && target !== "all") {
      exercises = await Exercise.find({
        $and: [{ bodyPart }, { target }],
      });
    } else if (bodyPart && bodyPart !== "all") {
      exercises = await Exercise.find({ bodyPart });
    } else if (target && target !== "all") {
      exercises = await Exercise.find({ target });
    } else if (name) {
      exercises = await Exercise.find({ name });
    } else {
      exercises = await Exercise.find({});
    }

    res.status(200).json({ data: exercises });
  } catch (error) {
    res.status(500).json(err);
  }
});

//GET EXERCISE
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const exercise = await Exercise.findById(id);
    res.status(200).json({ data: exercise });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
