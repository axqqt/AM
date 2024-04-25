const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
require('dotenv').config();
// MongoDB connection URL
const url = process.env.MongoURL;
// Database Name
const dbName = 'affiliates';
// Collection Name
const collectionName = 'users';

// Connection URL
const client = new MongoClient(url);

async function main() {
    try {
      // Connect to the MongoDB server
      await client.connect();
  
      // Create a change stream on the users collection
      const pipeline = [{ $match: { operationType: 'insert' } }];
      const collection = client.db(dbName).collection(collectionName);
      const changeStream = collection.watch(pipeline);
  
      // Set up email transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.personalMail,
          pass: process.env.personalPass,
        },
      });
      
  
      // Listen for changes in the users collection
      changeStream.on('change', async (change) => {
        // Extract new user data from the change event
        const newUser = change.fullDocument;
  
        // Compose email message
        const mailOptions = {
          from: 'teamveloxal@gmail.com',
          to: newUser.email, // Send email to the newly registered user
          subject: 'Welcome to Affiliates!',
          text: `Welcome to Affiliates!\n\nYour login credentials are:\n\nGmail: ${newUser.email}\nPassword: ${newUser.password}\n\nWe hope to help your company leverage your potential with our service!\n\nBest Regards,\nTeam Velo!`,
        };
  
        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      });
    } catch (err) {
      console.error('Error:', err);
    }
  }
  


main();
