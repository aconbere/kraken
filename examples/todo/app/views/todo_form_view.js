Todo.views.TodoForm = function (anchor, context) {
  console.log("Starting: views.TodoForm");
  this.anchor = $(anchor);
  this.input = this.anchor.find("input.new");
  this.context = context;

  var that = this;
  this.anchor.submit(function () {
    that.context.newTask(that.input.val());
    that.input.val("");
    return false;
  });
};
