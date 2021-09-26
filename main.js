const loading = document.getElementById("loading");
const custom_or_buildin_template = document.getElementById('custom_or_buildin_template');
const choose_style = document.getElementById("choose_style");
const hidden_canvas = document.getElementById("hidden_canvas");

const font_size = document.getElementById("font_size");
const justify = document.getElementsByName("justify");
const textColor = document.getElementById("textColor");

const buildin_templates = document.getElementById("buildin_templates");

const up_text = document.getElementById("up_text");
const down_text = document.getElementById("down_text")

const image_to_save = document.getElementById("image_to_save");

// buildin and custom
const custom_up = document.getElementById('custom_up');


function choose_style_fun() {
    let activeObject = c.getActiveObject();

    if(activeObject) {textColor.value = activeObject.fill;} else {textColor.value = '#000000'}
    
    if(choose_style.style.display != 'block')
    {
        choose_style.style.display = 'block';
        
        let fz = activeObject.fontSize;
        let jus = activeObject.textAlign;

        if(typeof(fz) != "number")
        {
            font_size.value = default_text.fontSize;
        }
        if(jus != "center" || jus == "left" || jus == "right")
        {
            justify.value = default_text.textAlign;
        }
        else {
            font_size.value = fz;
            justify.value = jus;
        }

    } else {choose_style.style.display = 'none';}
    
}

function set_style() {
    let justify_v;
    let activeObject = c.getActiveObject();

    for(let i of justify) {
        if(i.checked) {
            justify_v = i.value;
            break;
        } else {
            justify_v = "center"
        }
    }
    if(activeObject == undefined)
    {
        default_text.fontSize = font_size.value;
        default_text.textAlign = justify_v;
       
    } else {
        activeObject.fontSize = font_size.value;

        activeObject.textAlign = justify_v;
        activeObject.set('fill', textColor.value);
        c.renderAll();
    }

    choose_style_fun()
}


function show_buildin_templates()
{
    if(buildin_templates.style.display != 'block')
    {
        buildin_templates.style.display = 'block';
    } else {
        buildin_templates.style.display = 'none';
    }
}

function custom_tp()
{
    custom_up.addEventListener("change", () => {
        drawImage()

    }, {once: true})
    custom_or_buildin_template.style.display = 'none';
    custom_up.click()
}

function choose_template()
{
    if(custom_or_buildin_template.style.display != 'block')
    {
        custom_or_buildin_template.style.display = 'block';
    } else {
        custom_or_buildin_template.style.display = 'none';
    }
}

// canvas interaction

// upper text
up_text.addEventListener("keyup", (event) => {
    
    text.text = up_text.value;
    c.renderAll();
})

down_text.addEventListener("keyup", (event) => {
    text2.text = down_text.value;
    c.renderAll();
})

async function saveImage()
{   
    let image = new Image();
    let watermarked_image = new Image();

    let hc = hidden_canvas.getContext("2d");
    hidden_canvas.width = 577;
    hidden_canvas.height = 483;

    watermarked_image.onload = () => {
        image_to_save.setAttribute("href", watermarked_image.src);
        image_to_save.click()
    }
    image.onload = () => {
        c.setWidth(canvas_config.width);
        c.setHeight(canvas_config.height);

        /*
        image_to_save.setAttribute("href", image.src);
        image_to_save.click();

        canvas.setZoom(1)
        c.setWidth(canvas_config.width);
        c.setHeight(canvas_config.height);
        upanddown();
        */

       // add watermark
       let fReader = new FileReader();
       fetch('./images/watermark.png')
       .then(data => {return data.blob()})
       .then(response => {
            fReader.onloadend = (event) => {
                let wm = new Image();
                wm.src = event.target.result;
                hc.drawImage(image, 0, 0, hidden_canvas.width, hidden_canvas.height - 50);
                hc.drawImage(wm, 0, 433, hidden_canvas.width, 50)
                watermarked_image.src = hidden_canvas.toDataURL("image/jpeg");
            }

            fReader.readAsDataURL(response);
       })
       
       upanddown();
    }


    c.setZoom(4);
    c.setWidth(canvas_config.width * c.getZoom())
    c.setHeight(canvas_config.height * c.getZoom())

    image.src = c.toDataURL({format: 'jpeg', quality: 1});
}

function removeObject()
{
    c.remove(c.getActiveObject())
}

window.addEventListener("load", () => {
    loading.style.display = 'none';
})
