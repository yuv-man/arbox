const db = require('../models/db')

// create new user
function userCreate(req, res) {
    const {first_name, last_name, phone, email,
        joined_at, club_id, membership_name, end_date} = req.body
    
    db.query(
        'INSERT INTO users (first_name, last_name, phone, email, joined_at, club_id) VALUES (?,?,?,?,?,?)',
        [first_name, last_name, phone, email, joined_at, club_id], (err, result) => {
            if (err){
                console.log(err)
                res.status(500).send(err)
            } else {
                db.query(
                    'INSERT INTO memberships (user_id, start_date, end_date, membership_name) VALUES (?,?,?,?)', 
                    [result.insertId, joined_at, end_date, membership_name], (err, mem_res) => {
                        if(err){
                            console.log(err)
                            res.status(500).send(err)
                        } else {
                            res.status(200).send("success")
                        }
                    }
                )
            }
        }
    )
}


// create membership to an existing user
function membershipCreate(req, res) {
    const {user_id, start_date, end_date, membership_name} = req.body

    db.query(
        'INSERT INTO memberships (user_id, start_date, end_date, membership_name) VALUES (?,?,?,?)',
        [user_id, start_date, end_date, membership_name], (err, result) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            } else {
                res.status(200).send("membership created successfully")
            }
        }
    )
}


module.exports = {
    userCreate: userCreate,
    membershipCreate: membershipCreate
}