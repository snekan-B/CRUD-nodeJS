const asyncHandler=require('express-async-handler');
const contact=require('../models/contactmodel');
const contactmodel = require('../models/contactmodel');
// all contacts

const getContacts=asyncHandler(async(req,res)=>
{
    const contacts= await contact.find();
    res.json(contacts);
});

//create contact

const createContact=asyncHandler(async(req,res)=>
{
    console.log(req.body);
    const{name,email,phone}=req.body;
    if(!name||!email||!phone)
    {
        res.status(400);
        throw new Error("all fields are mandatory");
    }

    const newcontact=await contact.create({
        name,email,phone,
    });
    res.json(newcontact);
});

//get individual contact

const getContact=asyncHandler(async(req,res)=>
{
    const contact=await contactmodel.findById(req.params.id);
    if(!contact)
    {
        res.send(404);
        throw new Error("contact not found");
    }
    res.json(contact);
})

// update contact
const updateContact=asyncHandler(async(req,res)=>
{
    const contact=await contactmodel.findById(req.params.id);
    if(!contact)
    {
        res.send(404);
        throw new Error("contact not found");
    }

    const updateContact=await contactmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.json(updateContact);
})

//delete contact

const deleteContact=asyncHandler(async(req,res)=>
{
    const contact=await contactmodel.findById(req.params.id);
    if(!contact)
    {
        res.send(404);
        throw new Error("contact not found");
    }
    await contactmodel.deleteOne();

    res.json(contact);
})

module.exports={getContacts,createContact,getContact,updateContact,deleteContact};