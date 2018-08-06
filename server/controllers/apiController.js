// Not sure if this is needed for this app.

module.exports = (app) => {
  app.get('/api/person/:id', (req, res) => {
    // get that data from database
    res.json({ firstname: 'John', lastname: 'Doe' });
  });
};
