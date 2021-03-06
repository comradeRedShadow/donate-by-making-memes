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
    width: 100,
    left: canvas_config.width / 2 - 50,
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
        let data = document.getElementById(num);

        // fReader.readAsDataURL(data);
        img.src = data.src;
        document.getElementById("buildin_templates").style.display = 'none';
        document.getElementById('custom_or_buildin_template').style.display = 'none'
    }
    else {

        fReader.onloadend = (event) =>{
            // load image
            img.src = event.target.result;
        }
        fReader.readAsDataURL(custom_up.files[0])
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


    text = new fabric.Textbox("????????????????????????", up_text_style)
    c.add(text);

    text2 = new fabric.Textbox("????????????????????????", down_text_style)
    c.add(text2);

    c.renderAll();
}

upanddown()

function addText(style) {
    txt = new fabric.Textbox("??????", style)
    c.add(txt);
    c.bringToFront(txt);
    c.centerObject(txt)
    c.renderAll()
}

// Auto align when object is near center
const canvas_x_center = canvas_config.width / 2;
const canvas_y_center = canvas_config.height / 2;

const near_value = 5; // Object will align automically when it's near the center by near_value

c.on('object:moving', (e) => {
    let object = c.getActiveObject();
    const objectMiddleFromLeft = object.getCenterPoint().x;
    const objectMiddleFromTop = object.getCenterPoint().y;
  
    object.setPositionByOrigin(
      {
        x:
          objectMiddleFromLeft > c.width / 2 - near_value &&
          objectMiddleFromLeft < c.width / 2 + near_value
            ? canvas_x_center
            : objectMiddleFromLeft,
        y:
          objectMiddleFromTop > c.height / 2 - near_value &&
          objectMiddleFromTop < c.height / 2 + near_value
            ? canvas_y_center
            : objectMiddleFromTop,
      },
      "center",
      "center"
    );
})
