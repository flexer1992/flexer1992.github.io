var _uiFactory = function()
{

    this.CreateButton = function(context, btn_name, listener){
        return context.add.button(0,0, btn_name, listener, context);
    };

    this.CreateText = function(context, text, fontSize){
        var text = context.add.text(0, 0, text);
        text.anchor.set(0.5, 0.5);
        text.font = "officina_sans";
        text.fontSize = fontSize;
        return text;

    };

};

var UiFactory = new _uiFactory();