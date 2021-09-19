const c = new fabric.Canvas("canvas");

let canvas_config = {width: window.innerWidth - 20, height: 400, backgroundColor: '#ffffff'}

c.setDimensions(canvas_config);

// const c = canvas.getContext("2d");

function drawImage(build_in=false, num) 
{
    let fReader = new FileReader();
    // create image
    let img = new Image();

    
    img.onload = function(){
        // create image to display
        let img_ = new fabric.Image(img, {
            selectable: true,
            scaleX: 1, scaleY: 1,
        })
        // display image

        img_.scaleToHeight(300)
        c.add(img_);
        c.centerObject(img_);
        c.renderAll();
    }

    if(build_in == true)
    {
        fetch(`./images/${num}.jpeg`).then((data) => {
            return data.blob()
        }).then((data) => {
            fReader.readAsDataURL(data);
            document.getElementById("buildin_templates").style.display = 'none';
            document.getElementById('custom_or_buildin_template').style.display = 'none'
        })
    }
    else {fReader.readAsDataURL(custom_up.files[0])}

    fReader.onloadend = (event) =>{
        // load image
        img.src = event.target.result;
    }
}

// up and down text
let text;
let text2;

let default_text = {
        width: canvas_config.width - 100,
        fontFamily: "Arial",
        editable: true,
        left: 50,
        right: 50,
        textAlign: "center",
        fontSize: 20
}

let text_margin = 5

// Up
let up_text_style = {}
Object.assign(up_text_style, default_text)
up_text_style.top = text_margin

// Down
let down_text_style = {}
Object.assign(down_text_style, default_text);
down_text_style.top = canvas_config.height - down_text_style.fontSize - text_margin;


text = new fabric.Textbox("အပေါ်ကစာ", up_text_style)
c.add(text);

text2 = new fabric.Textbox("အောက်ကစာ", down_text_style)
c.add(text2);
c.renderAll();

function addText(style) {
    txt = new fabric.Textbox("စာ", style)
    c.add(txt);
    c.centerObject(txt)
    c.renderAll()
}

