const mongoose = require('mongoose');
const Model = mongoose.model('trips');

const tripsList = async (req, res) => {
  try {
    const q = await Model
      .find({})
      .exec();

    if (!q) {
      return res
        .status(404)
        .json({ "message": "No trips found" });
    }

    return res
      .status(200)
      .json(q);
  } catch (err) {
    return res
      .status(500)
      .json(err);
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const q = await Model
      .find({ 'code': req.params.tripCode })
      .exec();

    if (!q || q.length === 0) {
      return res
        .status(404)
        .json({ "message": "Trip not found" });
    }

    return res
      .status(200)
      .json(q);
  } catch (err) {
    return res
      .status(500)
      .json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};
