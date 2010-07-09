Todo.views.TodoForm = function (anchor) {
  console.log("Starting: views.TodoForm");
  this.anchor = $(anchor);
  this.input = this.anchor.find("input.new");

  var that = this;

  this.anchor.submit(function () {
    that.trigger("submit", [that.input.val()]);//context.newTask(that.input.val());
    that.input.val("");
    return false;
  });
};

Todo.views.TodoForm.prototype = new Kraken.objects.View();

