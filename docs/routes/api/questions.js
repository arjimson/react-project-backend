const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");

// Item model
const Question = require("../../models/questions");
const Questionnaire = require("../../models/questionnaires");

// @route   GET api/questions
// @desc    Get All Questions
// @access  Public
router.get("/", (req, res) => {
    Question.find()
      .sort({ date: -1 })
      .then(questions => {
        res.json(questions);
      });
});


router.get("/:id", (req, res) => {
  Question.findById(req.params.id)
    .then(questions => {
      res.json(questions);
    });
});

// @route   POST api/questions
// @desc    Create A Question
// @access  Public
router.post("/", (req, res) => {
  const newQuestion = new Question({
    category: req.body.category,
    questionType: req.body.questionType,
    question: req.body.question,
    answer: req.body.answer,
    choices: req.body.choices,
    timeAllotment: req.body.timeAllotment
  });
  newQuestion.save().then(question => res.json(question));
});

// @route   PUT api/questions
// @route   Update A Question
router.patch("/update/:id", (req, res) => {
  Question.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: {
        category: req.body.category,
        questionType: req.body.questionType,
        timeAllotment: req.body.timeAllotment,
        question: req.body.question,
        answer: req.body.answer
      }
    },
    {
      new: true
    },
    (err, question) => {
      if (err) {
        res.json({ success: false, msg: err });
      } else {
        res.status(200).json(question);
      }
    }
  );
});

// @route   DELETE api/questions
// @desc    Delete An Item
// @access  Public
router.delete("/:id", (req, res) => {
  Question.findById(req.params.id)
    .then(question => question.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   GET api/questions/is-exist
// @desc    is exist to questionnaires
// @access  Public

router.get("/is-exist/:id", async (req, res) => {
  Questionnaire.find(
    { questions : req.params.id 
  }).then(questionnaire => {
    res.json({ res: questionnaire, success: true })
  }).catch(err => res.status(404).json({ success: false }));
  // .then(questionnaire => {
  //   res.json(questionnaire)
  // })
  // .then(questionnaire => {
  //   let existQuestions = [];

  //   if(questionnaire.questions.)
  //   res.json(questions);
  // });

  // Questionnaire.count({ _id: req.params.id })
  //   .then(count => count > 0 ? res.json({ existCount : count, isExist: true }) : res.json({ existCount : count, isExist: false }))
  
      // .then(questionnaires => {
      //     res.json(questionnaires);
      // });
});


module.exports = router;
