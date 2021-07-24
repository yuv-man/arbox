const db = require('../models/db')
const userCreateStatement = 'INSERT INTO users (first_name, last_name, phone, email, joined_at, club_id) VALUES (?,?,?,?,?,?)'
const userExistStatement = `SELECT * FROM users WHERE email = ?`;


//create new user
function userCreate(req, res) {
    const {first_name, last_name, phone, email, joined_at, club_id} = req.body

    db.query(
        userExistStatement ,[email], (err, result) => {
            if (err) {
                throw err
            } else {
                if(result.length > 0) {
                    res.status(400).send('user is already exists')
                } else {
                    db.query(
                        userCreateStatement, 
                        [first_name, last_name, phone, email, joined_at, club_id], (err, result) => {
                            if (err){
                                console.log(err)
                                res.status(500).send(err)
                            } else {
                                res.status(200).send('user created')
                            }
                        }
                    )
                }
            }
        }
    )
}

// create new user with membership
function userCreateWithMembership(req, res) {
    const {first_name, last_name, phone, email,
        joined_at, club_id, membership_name, end_date} = req.body
    
    db.query(
        userExistStatement ,[email], (err, result) => {
            if (err) {
                throw err
            } else {
                if(result.length > 0) {
                    res.status(400).send('user is already exists')
                } else {
                    db.query(
                        userCreateStatement,
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

//get all the users
function getUsers(req, res) {
    db.query(
        "SELECT * FROM users", (err, result) => {
            if (err) {
                res.status(500).sent('there is a problem in the users table')
            } else {
                res.status(200).send(result)
            }
        }
    )
}

//get all memberships
function getMemberships(req, res) {
    db.query(
        "SELECT * FROM memberships", (err, result) => {
            if (err) {
                res.status(500).sent('there is a problem in the memberships table')
            } else {
                res.status(200).send(result)
            }
        }
    )
}

module.exports = {
    userCreate: userCreate,
    userCreateWithMembership: userCreateWithMembership,
    membershipCreate: membershipCreate,
    getUsers: getUsers,
    getMemberships, getMemberships
}