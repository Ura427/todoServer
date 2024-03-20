const { getClient } = require("./get-client");

const createTable = async () => {
  const client = await getClient();
  let createTableQuery = `
    CREATE TABLE IF NOT EXISTS my_table(
        id BIGSERIAL PRIMARY KEY NOT NULL,
        name VARCHAR,
        time TIMESTAMP NOT NULL DEFAULT current_timestamp
    );  
  `;
  const res = await client.query(createTableQuery);
  console.log("Table created");
  await client.end();
};

createTable().catch((error) => {
    console.error("Error:", error);
  });
