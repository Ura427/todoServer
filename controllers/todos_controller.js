const db = require("../db");

class TodoController {
  async createTodo(req, res) {
    const { task } = req.body;
    // Create a new Date object from the date string
    const date = new Date();

    // Get the month, date, year, hours, minutes, and seconds from the Date object
    const month = date.toLocaleString("en", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the date in the desired format
    const created =
      `${month} ${day} ${year} ` +
      `${hours}:${minutes}:${seconds}`.replace(/(?<!\d)(\d)(?!\d)/g, "0$1");

    await db.query(
      "INSERT INTO todos (task, created) VALUES ($1, $2) RETURNING *",
      [task, created],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`Todo added with id: ${results.rows[0].id}`);
      }
    );
  }

  async getTodo(req, res) {
    const id = parseInt(req.params.id);

    await db.query(
      "SELECT * FROM todos WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  }

  async getTodos(req, res) {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit; // Calculate the offset
  
    const query = {
      text: "SELECT * FROM todos ORDER BY id OFFSET $1 LIMIT $2",
      values: [offset, limit],
    };
  
    try {
      const results = await db.query(query);
      res.status(200).json(results.rows);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Error fetching todos" });
    }
  }

  async updateTodo(req, res) {
    const id = parseInt(req.params.id);
    const { task } = req.body;
    // Create a new Date object from the date string
    const date = new Date();

    // Get the month, date, year, hours, minutes, and seconds from the Date object
    const month = date.toLocaleString("en", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the date in the desired format
    const created =
      `${month} ${day} ${year} ` +
      `${hours}:${minutes}:${seconds}`.replace(/(?<!\d)(\d)(?!\d)/g, "0$1");

    await db.query(
      "UPDATE todos SET task = $1, created = $2 WHERE id = $3",
      [task, created, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Todo modified with id: ${id}`);
      }
    );
  }

  async deleteTodo(req, res) {
    const id = parseInt(req.params.id);

    await db.query(
      "DELETE FROM todos WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Deleted todo with id: ${id}`);
      }
    );
  }
}

module.exports = new TodoController();
