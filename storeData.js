const { insertCareer } = require('./database');

function storeData(data) {

  const career = {
    title: data.title,
    location: data.location,
    department: data.department,
    employment_type: data.employment_type,
    minimum_experience: data.minimum_experience,
    type: data.type,
    description: data.description,
    url: data.url
  };

  insertCareer(career)
};

module.exports = {
  storeData
}
