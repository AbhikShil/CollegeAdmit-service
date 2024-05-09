const College = require("../models/college");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newCollege = await new College(req.body).save();
    res.json(newCollege);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create college failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let colleges = await College.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(colleges);
};

exports.remove = async (req,res) => {
  try{
    let college = await College.findOneAndRemove({slug: req.params.slug,}).exec();
    res.json(college);
  }
  catch(err){
    console.log(err);
    return res.status(400).send("College delete failed");
  }
}

exports.read = async (req, res) => {
  const college = await College.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(college);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await College.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("COLLEGE UPDATE ERROR ----> ", err);
    // return res.status(400).send("College update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// WITH PAGINATION
exports.list = async (req, res) => {
  // console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 4; // 3

    const colleges = await College.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(colleges);
  } catch (err) {
    console.log(err);
  }
};

exports.collegesCount = async (req, res) => {
  let total = await College.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.listRelated = async (req, res) => {
  const college = await College.findById(req.params.collegeId).exec();

  const related = await College.find({
    _id: { $ne: college._id },
    category: college.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .exec();

  res.json(related);
};

exports.allColleges = async (req, res) =>{
  let colleges = await College.find({})
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  
  res.json(colleges);

};

// SERACH / FILTER

const handleQuery = async (req, res, query) => {
  const colleges = await College.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();

  res.json(colleges);
};

const handleFees = async (req, res, fees) => {
  try {
    let colleges = await College.find({
      fees: {
        $gte: fees[0],
        $lte: fees[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .exec();

    res.json(colleges);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let colleges = await College.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .exec();

    res.json(colleges);
  } catch (err) {
    console.log(err);
  }
};

const handleStar = (req, res, stars) => {
  College.aggregate([
    {
      $project: {
        document: "$$ROOT",
        // title: "$title",
        floorAverage: {
          $floor: "$ratings" , // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      College.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .exec((err, colleges) => {
          if (err) console.log("College AGGREGATE ERROR", err);
          res.json(colleges);
        });
    });
};

const handleSub = async (req, res, sub) => {
  const colleges = await College.find({ subs: sub })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();

  res.json(colleges);
};


const handleSeatType = async (req, res, seatType) => {
  const colleges = await College.find({ seatType })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();

  res.json(colleges);
};


exports.searchFilters = async (req, res) => {
  const {
    query,
    fees,
    category,
    stars,
    sub,
    seatType,
  } = req.body;

  if (query) {
    console.log("query --->", query);
    await handleQuery(req, res, query);
  }

  // price [20, 200]
  if (fees !== undefined) {
    console.log("fees ---> ", fees);
    await handleFees(req, res, fees);
  }

  if (category) {
    console.log("category ---> ", category);
    await handleCategory(req, res, category);
  }

  if (stars) {
    console.log("stars ---> ", stars);
    await handleStar(req, res, stars);
  }

  if (sub) {
    console.log("sub ---> ", sub);
    await handleSub(req, res, sub);
  }

  if (seatType) {
    console.log("seatType ---> ", seatType);
    await handleSeatType(req, res, seatType);
  }
};

