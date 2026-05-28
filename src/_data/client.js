module.exports = {
    name: "Army Energy",
    email: "info@armyelectric.com",
    phoneForTel: "647-229-7005",
    phoneFormatted: "(647) 229-7005",
    address: {
        lineOne: "First Address Line",
        lineTwo: "Second Address Line",
        city: "Toronto",
        state: "ON",
        zip: "80206",
        country: "CA",
        mapLink: "https://maps.app.goo.gl/TEdS5KoLC9ZcULuQ6",
    },
    socials: {
        instagram: "https://www.instagram.com/armyelectric/",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://army-energy.com",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
