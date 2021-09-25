const loading = document.getElementById("loading");
const custom_or_buildin_template = document.getElementById('custom_or_buildin_template');
const choose_style = document.getElementById("choose_style");
const font_size = document.getElementById("font_size");
const justify = document.getElementsByName("justify");
const buildin_templates = document.getElementById("buildin_templates");

const up_text = document.getElementById("up_text");
const down_text = document.getElementById("down_text")

const image_to_save = document.getElementById("image_to_save");

// buildin and custom
const custom_up = document.getElementById('custom_up');


function choose_style_fun() {

    if(choose_style.style.display != 'block')
    {
        choose_style.style.display = 'block';
        
        let fz = c.getActiveObject().fontSize;
        let jus = c.getActiveObject().textAlign

        if(typeof(fz) != "number")
        {
            font_size.value = default_text.fontSize;
        }
        if(jus != "center" || jus == "left" || jus == "right")
        {
            justify.value = default_text.textAlign;
        } else {
            font_size.value = fz;
            justify.value = jus;
        }
    } else {choose_style.style.display = 'none';}
    
}

function set_style() {
    let justify_v;

    for(let i of justify) {
        if(i.checked) {
            justify_v = i.value;
            break;
        }
    }
    if(c.getActiveObject() == undefined)
    {
        default_text.fontSize = font_size.value;
        default_text.textAlign = justify_v;
       
    } else {
        console.log(justify.value);
        c.getActiveObject().fontSize = font_size.value;
        c.getActiveObject().textAlign = justify_v;
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

    image.onload = () => {
        c.setWidth(canvas_config.width);
        c.setHeight(canvas_config.height);

        image_to_save.setAttribute("href", image.src);
        image_to_save.click();

        canvas.setZoom(1)
        c.setWidth(canvas_config.width);
        c.setHeight(canvas_config.height);
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
