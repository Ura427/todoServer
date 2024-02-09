const Router = require("express");
const router = new Router();
const todoController = require("../controllers/todos_controller");

router.post("/todos", todoController.createTodo);
router.get("/todos/:id", todoController.getTodo);
router.get("/todos", todoController.getTodos);
router.put("/todos/:id", todoController.updateTodo);
router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
