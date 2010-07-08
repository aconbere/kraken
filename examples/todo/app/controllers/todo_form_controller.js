Todo.controllers.TodoForm = function (context) {
  console.log("Starting: controllers.TodoForm");
  this.context = context;
  this.form = new context.views.TodoForm("#todo-form", this);
};

Todo.controllers.TodoForm.prototype.newTask = function (value) {
  var item = new Todo.models.Item({"value": value});
  this.context.pubsub.publish("/tasks/new", [item]);
};
