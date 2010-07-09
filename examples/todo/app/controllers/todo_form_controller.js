Todo.controllers.TodoForm = function (context) {
  console.log("Starting: controllers.TodoForm");

  this.form = new context.views.TodoForm("#todo-form", this);

  this.form.bind("submit", function (value) {
    var item = new Todo.models.Item({"value": value});
    context.pubsub.publish("/tasks/new", [item]);
  });
};
