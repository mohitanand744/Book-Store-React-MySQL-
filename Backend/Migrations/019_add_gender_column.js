module.exports = {
  name: "add_gender_column",
  up: "ALTER TABLE users ADD COLUMN gender ENUM('MALE', 'FEMALE', 'OTHER') DEFAULT NULL;",
};
