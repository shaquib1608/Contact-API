const Contact = require('../models/Contact');


exports.createContact = async (req, res) => {
    const { name, email, phone, type } = req.body;
    // const userid = req.userData.userId;

    //validation
    if (!name || !email || !phone || !type) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const newcontact = await Contact.create({
        name,
        email,
        phone,
        type,
        user: req.user
    });
    res.status(201).json({ message: 'Contact created successfully', contact: newcontact });

}
exports.getAllContacts = async (req, res) => {
    const contacts = await Contact.find();

    if (!contacts) {
        return res.status(404).json({ message: 'No contacts found' });
    }
    // console.log(contacts)
    res.status(200).json({ message: 'All contacts', contacts });
}

exports.getContactById = async (req, res) => {
    const id = req.params.id
    const contact = await Contact.findById(id);
    if (!contact) {
        return res.status(404).json({ message: 'No contact found' });
    }


    res.status(200).json({ message: 'Contact found', contact });
}
// console.log(contacts)

exports.updateById = async (req, res) => {
    const { name, email, type, phone } = req.body
    const id = req.params.id
    const updatevalue = await Contact.findByIdAndUpdate(id, {
        name,
        email,
        type,
        phone
    }, { new: true })
    res.status(200).json({ message: 'Contact updated successfully', updatevalue });
}

exports.deleteById = async (req, res) => {

    const id = req.params.id
    const deletevalue = await Contact.findByIdAndDelete(id)
    res.status(200).json({ message: 'Contact deleted successfully', deletevalue });
}


exports.getContactByUserId = async (req, res) => {
    const id = req.params.id
    const contact = await Contact.find({ user: id });
    if (!contact) {
        return res.status(404).json({ message: 'No contact found' });
    }


    res.status(200).json({ message: 'User Specefic Contact found', contact });
}