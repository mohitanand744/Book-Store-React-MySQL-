module.exports = {
  name: "adding_public_id_columns",
  up: `
  -- Add public_id column
    ALTER TABLE users 
    ADD COLUMN profile_pic_public_id VARCHAR(255) NULL;
  `,
};
