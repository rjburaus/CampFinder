const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected.');
}).catch(err => {
    console.log('Error: ', err);
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const campground = new Campground({
            author: '6068db48292bb41a98e77a8b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, molestias rerum similique eius iste quis minima qui recusandae molestiae est vel accusamus nihil rem quisquam quod nisi autem eligendi nulla.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqkbnza7j/image/upload/v1618607551/YelpCamp/vpriqavu1txrna7ajrqi.jpg',
                    filename: 'YelpCamp/vpriqavu1txrna7ajrqi'
                },
                {
                    url: 'https://res.cloudinary.com/dqkbnza7j/image/upload/v1618607552/YelpCamp/bznswk4ckaxulpsewa6b.png',
                    filename: 'YelpCamp/bznswk4ckaxulpsewa6b'
                }
            ]
        });

        await campground.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});