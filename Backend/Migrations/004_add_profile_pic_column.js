module.exports = {
  name: "add_profile_pic_column",
  up: `
    ALTER TABLE users ADD COLUMN profile_pic VARCHAR(255) DEFAULT 'https://img.freepik.com/premium-vector/human-icon_970584-3.jpg?semt=ais_hybrid&w=740&q=80';
  `,
};
