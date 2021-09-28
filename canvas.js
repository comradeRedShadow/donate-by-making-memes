const c = new fabric.Canvas("canvas");
const c_style = document.getElementById("canvas");

window.devicePixelRatio = 2;

// config
let canvas_config = {
    width: 577,
    height: 433,
    backgroundColor: '#ffffff'
}

// for mobile
if(window.innerWidth <= '600')
{
    canvas_config.width = window.innerWidth - 25;
    canvas_config.height = 300;
    fabric.Object.prototype.set({
        borderScaleFactor: 3,
        transparentCorners: true,
        cornerColor: 'gray'
    })

}

let default_text = {
    fontFamily: 'Arial',
    editable: true,
    originX: 'center',
    width: 100,
    left: canvas_config.width / 2,
    fontSize: 16,
    lineHeight: 1.3,
    strokeWidth: 1,
    splitByGrapheme: false,
    textAlign: 'center'
}

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
        

        if(c.getObjects().indexOf(text) >= 0) {c.bringToFront(text);}

        if(c.getObjects().indexOf(text2) >= 0) {c.bringToFront(text2);}

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

let text_margin = 5

function upanddown() {
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
}

upanddown()

function addText(style) {
    txt = new fabric.Textbox("စာ", style)
    c.add(txt);
    c.bringToFront(txt);
    c.centerObject(txt)
    c.renderAll()
}

// Auto align when object is near center
const canvas_x_center = canvas_config.width / 2;
const canvas_y_center = canvas_config.height / 2;

const near_value = 10; // Object will align automically when it's near the center by near_value

c.on('object:moving', (e) => {
    let object_x_center = e.target.left;
    let object_y_center = e.target.top + e.target.height / 2;

    if(object_x_center > canvas_x_center - near_value && object_x_center < canvas_x_center + near_value) {
        e.target.left = canvas_x_center; // Left is relative to middle of the object(text)
        c.renderAll()
    }

    if(object_y_center > canvas_y_center - near_value && object_y_center < canvas_y_center + near_value) {
        e.target.top = canvas_y_center - e.target.height / 2;
        c.renderAll()
    }
})
