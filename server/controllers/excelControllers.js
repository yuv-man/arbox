const db = require('../models/db')
const readXlsxFile = require("read-excel-file/node");

// add excel table to database

const upload = async (req, res) => {
    const club_id = req.body
    try {
        if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
        }

        let path =
        __dirname + "/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
        rows.shift();

        rows.forEach((row) => {        
            db.query( //check if email existed in the databse
                `SELECT * FROM users WHERE email = ?`,[row[2]], (err, result) =>{
                    if(err){
                        res.status(500).send(err)
                    } else {
                        if(result.length > 0) {
                            console.log('user is already exists')
                        } else {
                            db.query( // insert user to database
                                "INSERT INTO users (first_name, last_name, email, phone, joined_at, club_id) VALUES (?,?,?,?,?,?)", 
                                [row[0], row[1], row[2], row[3], row[4], '2400'], (err, result) =>
                                    { if (err) {
                                        res.status(500).send(err)
                                    } else {
                                        db.query( //insert membership to database
                                        "INSERT INTO memberships (user_id, start_date, end_date, membership_name) VALUES (?,?,?,?)",
                                    [result.insertId, row[4], row[5], row[6]]
                                    )}
                                }
                            )
                        }
                    }
                }
            )
        })
        res.send('table added')
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

module.exports = {
    upload
}
