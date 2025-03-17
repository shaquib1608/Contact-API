const express = require('express');
const { createContact, getAllContacts, getContactById, updateById, deleteById, getContactByUserId } = require('../controllers/contact');
const { isAuthentication } = require('../middleware/Auth');
const router = express.Router()


//adding middleware before creating 
router.post("/newContact", isAuthentication, createContact);
router.get("/getAllContacts", getAllContacts);
router.get("/getContacts/:id", getContactById);
router.put("/update/:id", isAuthentication, updateById)
router.delete("/delete/:id", isAuthentication, deleteById)
router.get("/userid/:id", getContactByUserId)

module.exports = router;