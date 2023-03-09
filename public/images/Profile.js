const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema (
   {
     user: {
       type: Schema.Types.ObjectId,
       required: true,
       es_indexed: true,
       ref: 'User'
     },
     first_name: {
       type: String,
       isLength: {
          options: [{
             max: 50
          }],
          errorMessage: "The first name must be under 50 characters"
       },
       es_indexed: true,
     },
     last_name: {
       type: String,
       isLength: {
          options: [{
             max: 50
          }],
          errorMessage: "The last name must be under 50 characters"
       },
       es_indexed: true,
     },
     phone_number: {
       type: String,
       isLength: {
          options: [{
             max: 25
          }],
          errorMessage: "The phone number must be under 25 characters"
       },
       es_indexed: true,
     },
     profile_pic: {
       type: String,
       maxlength: 200,
       es_indexed: true,
     },
     street: {
       type: String,
       isLength: {
          options: [{
             max: 150
          }],
          errorMessage: "The street must be under 150 characters"
       },
       es_indexed: true,
     },
     city: {
       type: String,
       isLength: {
          options: [{
             max: 150
          }],
          errorMessage: "The city must be under 150 characters"
       },
       es_indexed: true,
     },
     district: {
       type: String,
       isLength: {
          options: [{
             max: 150
          }],
          errorMessage: "The district must be under 150 characters"
       },
       es_indexed: true,
     },
     state: {
       type: String,
       isLength: {
          options: [{
             max: 150
          }],
          errorMessage: "The state must be under 50 characters"
       },
       es_indexed: true,
     },
     country: {
       type: String,
       isLength: {
          options: [{
             max: 50
          }],
          errorMessage: "The country must be under 50 characters"
       },
       es_indexed: true,
     },
     latitude: {
       type: String,
       maxlength: 50,
       es_indexed: true,
     },
     longtitude: {
       type: String,
       maxlength: 50,
       es_indexed: true,
     },
   //   anonymous_email_hash: {
   //     type: String
   //   },
     cached_location: {
       type: String
     },
     // user_role: {
     //   type: String,
     //   default: "User"
     // }
     reputation: {
      type: Number,
      default: 0,
      es_indexed: true,
     }
   },
   {
     timestamps: true
   }
 );

 module.exports = mongoose.model('Profile', ProfileSchema);
