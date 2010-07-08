Todo.models.Item = Kraken.objects.Model.create(function (data) {
  console.log("new");
  this.data = data;
  this.id = data.id;
  this.value = this.data.value;
});

Todo.models.Item._ids = null;
Todo.models.Item._getIds = function () {
  if (!this._ids) {
    var s = localStorage.getItem("/todo/items");
    if (s && s.length >= 1) {
      this._ids = JSON.parse(s);
    } else {
      this._ids = [];
    }
  }
  return this._ids;
};

Todo.models.Item._setIds = function (ids) {
  localStorage.setItem("/todo/items", JSON.stringify(ids));
};

Todo.models.Item.prototype._setItem = function () {
  var _ids = Todo.models.Item._getIds();
  console.log("setItem");
  console.log(this);
  if (_ids.indexOf(this.id) < 0) {
    _ids.push(this.id);
    Todo.models.Item._setIds(_ids);
    localStorage.setItem("/todo/items/" + this.id, JSON.stringify(this.toJSON()));
  }
};

Todo.models.Item.prototype._getItem = function (id) {
  var data = localStorage.getItem("/todo/items/" + id);
  if (data && data.length >= 1) {
    return JSON.parse(data);
  }
  return null;
};

Todo.models.Item.prototype._removeItem = function (id) {
  var data = localStorage.removeItem("/todo/items/" + id);
};

Todo.models.Item.removeItem = function (id) {
  var ids = Todo.models.Item._getIds();
  var il = ids.length;

  Todo.models.Item.prototype._removeItem(id);
  var newIds = [];
  for (var i = 0; i < il; i++) {
    if (ids[i] != id) {
      newIds.push(ids[i]);
    }
  }
  Todo.models.Item._setIds(newIds);
}

Todo.models.Item._fill = function () {
  var ids = Todo.models.Item._getIds();
  var il = ids.length;
  
  for (var i = 0; i < il; i ++) {
    var item = this.prototype._getItem(ids[i]);
    if (item) {
      item.shallow = true;
      new Todo.models.Item(item);
    }
  }
};

Todo.models.Item.prototype.create = function () {
  if (!this.data.shallow) {
    this._setItem();
  }
};

Todo.models.Item.prototype.destroy = function () {
  localStorage.removeItem("/todo/items/" + this.id);
};

Todo.models.Item.prototype.getData = function () {
  return JSON.parse(localStorage.getItem("/todo/items/" + this.id));
};

Todo.models.Item.prototype.toJSON = function () {
  return { "value": this.value
         , "id": this.id
         };
};
