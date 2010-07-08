Todo.controllers.TodoList = function (context) {
  console.log("Starting: controllers.TodoList");
  this.context = context;
  this.views = {};
  this.views.TodoList = new Todo.views.TodoList("#todo-list", this);

  var that = this;

  this.context.pubsub.subscribe("/app/start", function () {
    Todo.models.Item._fill();
    var tasks = Todo.models.Item.all();
    var tl = tasks.length;
    for (var i = 0; i < tl; i++) {
      that.views.TodoList.addTask(tasks[i]);
    }
    
  });

  this.context.pubsub.subscribe("/tasks/new", function (task) {
    that.views.TodoList.addTask(task);
  });
};

Todo.controllers.TodoList.prototype.removeTask = function (id) {
  this.context.pubsub.publish("/tasks/remove", [{"id": id}]);
  Todo.models.Item.removeItem(id);
};
