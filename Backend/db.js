const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const pg = require("pg");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const { Client } = pg;
const client = new Client({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "mcqDB",
});
client.connect().then(() => console.log("client connected"));

client.query("SELECT $1::text as message", ["Hello world!"]).then(
  (res, err) => console.log(res.rows[0].message) // Hello world!
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use a timestamp to avoid filename conflicts
  },
});
const upload = multer({ storage: storage });
// 3

router.post("/api/images", upload.single("file"), async (req, res) => {
  // 4
  console.log("entered upload");
  const testName = req.body.test;

  const imageName = req.file.filename;
  console.log(imageName);
  console.log(testName);

    client
      .query(
        `CREATE TABLE ${testName}(id SERIAL PRIMARY KEY NOT NULL ,QUESTION VARCHAR NOT NULL ,OPTION01 VARCHAR NOT NULL, OPTION02 VARCHAR NOT NULL ,OPTION03 VARCHAR NOT NULL ,
  OPTION04 VARCHAR NOT NULL, CORRECTOPTION VARCHAR NOT NULL);`
      )
      .then((res, err) => {
        if (!err) {
          console.log("Created table");
        } else {
          console.log(err);
        }
      });

  const uploadResult = await fileManager.uploadFile(`images/${imageName}`, {
    mimeType: "image/jpeg",
    displayName: imageName,
  });
  // View the response.
  console.log(
    `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
  );

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([
    "Can you make the questions and the four options in the image in a JSON array without any non-white space characters ,I need this four fields question, option01, option02, option03, option04, correctOption",
    {
      fileData: {
        fileUri: uploadResult.file.uri,
        mimeType: uploadResult.file.mimeType,
      },
    },
  ]);

  raw_response = result.response.text();
  const cleanedJson = JSON.parse(raw_response
  .trim() // Remove leading/trailing whitespace
  .replace(/^```json\s*/, '') // Remove ```json and any following whitespace
  .replace(/\s*```$/, '')); // Remove ``` at the end and any preceding whitespace

  //   changes needed here ->
     cleanedJson.forEach(Element => {
          client
     .query(
        `INSERT INTO ${testName}(QUESTION,OPTION01,OPTION02,OPTION03,OPTION04,CORRECTOPTION) VALUES($1,$2,$3,$4,$5,$6)`,
        [Element.question, Element.option01, Element.option02, Element.option03, Element.option04, Element.correctOption]
      )
     .then((response, err) => {
        if (!err) {
          console.log("Data inserted");
        
        }
        else{console.log(err);
        }
      });
     });

     res.status(200).json({ message: 1 });

  // Save this data to a database probably


  
});

router.get("/api/getTests", (req, res) => {
  const {test} = req.query
  client
    .query(`SELECT * FROM ${test}`)
    .then((response, err) => {
      if (!err) {
        res.json(response.rows);
      } else {
        console.log(err);
      }
    });
});

module.exports = router;
