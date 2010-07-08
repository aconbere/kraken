Todo.views.TodoList = function (anchor, context) {
  console.log("Starting: views.TodoList");
  this.anchor = $(anchor);
  this.context = context;

  var that = this;
  this.clearButton = $("#clear");
  this.clearButton.click(function () {
    that.clearTasks();
    return false;
  });
  
};

Todo.views.TodoList.prototype.addTask = function (task) {
  var that = this;

  // if default el exits remove it
  this.anchor.find(".default").remove();

  var removeButton = $('<span class="remove-button">x</span>').click(function () {
        taskEl.remove();
        that.context.removeTask(task.id);
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
    that.context.removeTask(el.data("task"));
    el.remove();
  });
};
