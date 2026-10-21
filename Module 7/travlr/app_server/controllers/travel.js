const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

/* GET travel view */
const travel = async (req, res) => {
  await fetch(tripsEndpoint, options)
    .then(response => response.json())
    .then(json => {
      if (!Array.isArray(json)) {
        return res.status(500).render('travel', {
          title: 'Travlr Getaways',
          trips: [],
          message: 'Unable to get trip data.'
        });
      }

      if (json.length === 0) {
        return res.render('travel', {
          title: 'Travlr Getaways',
          trips: [],
          message: 'No trips found.'
        });
      }

      return res.render('travel', {
        title: 'Travlr Getaways',
        trips: json
      });
    })
    .catch(err => res.status(500).send(err.message));
};

module.exports = {
  travel
};
