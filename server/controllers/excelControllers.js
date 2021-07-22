const db = require('../models/db')
const readXlsxFile = require("read-excel-file/node");

// add excel table to database

const upload = async (req, res) => {
    try {
        if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
        }

        let path =
        __dirname + "/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
        rows.shift();

        console.log(rows)

        let usersTable = [];
        let membershipTable = [];

        rows.forEach((row) => {
            let userRow = [row[0], row[1], row[2], row[3], row[4], '2400']
            console.log(userRow)
            usersTable.push(userRow)
        })
    
        const statement = "INSERT INTO users (first_name, last_name, email, phone, joined_at, club_id) VALUES ?";
        
        db.query(
            statement, [usersTable], (err, result) => {
                if(err){
                    console.log(err)
                    res.send(err)
                } else {
                    console.log(result.insertId)
                    res.send('well done')
                }
            }
        )
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
