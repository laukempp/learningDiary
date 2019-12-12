const getTableData = (req, res, db) => {
  db.select()
    .from("topics")
    .then(items => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const postTableData = (req, res, db) => {
  const {
    id,
    title,
    description,
    timetomaster,
    timespent,
    source,
    startlearningdate,
    inprogress
  } = req.body;

  db("topics")
    .insert({
      id,
      title,
      description,
      timetomaster,
      timespent,
      source,
      startlearningdate,
      inprogress
    })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const putTableData = (req, res, db) => {
  const {
    id,
    title,
    description,
    timetomaster,
    timespent,
    source,
    startlearningdate,
    inprogress
  } = req.body;
  db("topics")
    .where({ id })
    .update({
      title,
      description,
      timetomaster,
      timespent,
      source,
      startlearningdate,
      inprogress
    })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const deleteTableData = (req, res, db) => {
  const { id } = req.body;
  db("topics")
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
};
