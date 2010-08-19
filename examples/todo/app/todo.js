Controller1.register("view1", View1);
Controller1.register("view2", View2);

var options = { "controllers": [ Controller1
                               , Controller2
                               , Controller3
                               ]}

var Todo = new Kraken.Core(options);
