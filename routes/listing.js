const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { required } = require("joi");
const passport = require("passport");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// const multer  = require('multer');
// const {storage, cloudinary} = require("../cloudConfig.js");
// const upload = multer({storage});

const listingController = require("../Controllers/listings.js");

router.route("/")
    //INDEX ROUTE
    .get(wrapAsync(listingController.index))
    //CREATE ROUTE
    .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    //SHOW ROUTE
    .get(wrapAsync(listingController.showListing))
    //UPDATE ROUTE
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    //DELETE ROUTE
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//INDEX ROUTE
//router.get("/", wrapAsync(listingController.index));

//CREATE ROUTE
//router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//SHOW ROUTE
//router.get("/:id", wrapAsync(listingController.showListing));

//UPDATE ROUTE
//router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//DELETE ROUTE
//router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;