Todo.controllers.TodoList = function (context) {
  console.log("Starting: controllers.TodoList");
  this.context = context;
  this.views = {};
  this.views.TodoList = new Todo.views.TodoList("#todo-list", this);

  var that = this;

  this.context.pubsub.subscribe("/app/start", function () {
    var tasks = Todo.models.Item.all();
    var tl = tasks.length;
    for (var i = 0; i < tl; i++) {
      that.context.pubsub.publish("/tasks/new", [tasks[i]]);
    }
    
  });

  this.context.pubsub.subscribe("/tasks/new", function (task) {
    that.views.TodoList.trigger("add", [task]);
  });
};

Todo.controllers.TodoList.prototype.removeTask = function (id) {
  this.context.pubsub.publish("/tasks/remove", [{"id": id}]);
  Todo.models.Item.removeItem(id);
};
