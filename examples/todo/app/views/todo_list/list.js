Todo.views.TodoList = function (anchor) {
  console.log("Starting: views.TodoList");
  this.anchor = $(anchor);

  var that = this;

  $("#clear").click(function () {
    that.clearTasks();
    return false;
  });

  this.bind("add", this.addTask);
  this.bind("add", this.removeDefaultText);
};

Todo.views.TodoList.prototype = new Kraken.objects.View();

Todo.views.TodoList.prototype.removeDefaultText = function () {
  // if default el exits remove it
  this.anchor.find(".default").remove();
};

Todo.views.TodoList.prototype.addTask = function (task) {
  var that = this;
  var removeButton = $('<span class="remove-button">x</span>').click(function () {
    taskEl.remove();
    that.trigger("remove", [taskEl.data("task")]);
    return false;
  });

  var text = $("<span>" + task.value + "</span>");

  var taskEl = $('<li></li>')
                .append(removeButton)
                .append(text)
                .data("task", task);

  this.anchor.append(taskEl);
};

Todo.views.TodoList.prototype.clearTasks = function () {
  var that = this;
  this.anchor.find("li").each(function (i, el) {
    el = $(el);
    el.remove();
    that.trigger("remove", [el.data("task")]);
  });
};
