const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");

// Item model
const Questionnaire = require("../../models/questionnaires");

// @route   GET api/questionnaires
// @desc    Get All Questionnaires
// @access  Public

router.get("/", async (req, res) => {
    Questionnaire.find()
        .populate("questions")
        .then(questionnaires => {
            res.json(questionnaires);
        });
});





// @route   POST api/questionnaire
// @desc    Create A Questionnaire
// @access  Public
router.post("/", (req, res) => {
    const newQuestionnaire = new Questionnaire({
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions
    });
    newQuestionnaire.save().then(questionnaire => res.json(questionnaire));
});

// @route   DELETE api/questionnaire
// @desc    Delete An Item
// @access  Public
router.delete("/:id", (req, res) => {
    Questionnaire.findById(req.params.id)
      .then(questionnaire => questionnaire.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
});

router.get("/:id", (req, res) => {
    Questionnaire.findById(req.params.id)
      .populate("questions")
      .then(questionnaires => {
        res.json(questionnaires);
      });
});

router.patch("/update/:id", (req, res) => {
    Questionnaire.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          questions: req.body.questions,
        }
      },
      {
        new: true
      },
      (err, questionnaire) => {
        if (err) {
          res.json({ success: false, msg: err });
        } else {
          res.status(200).json(questionnaire);
        }
      }
    );
});


module.exports = router;
