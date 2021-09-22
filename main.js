const custom_or_buildin_template = document.getElementById('custom_or_buildin_template');
const choose_style = document.getElementById("choose_style");
const font_size = document.getElementById("font_size");
const justify = document.getElementById("justify");
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
            font_size.value = 16;
        }
        if(jus != "center" || jus != "middle"|| jus == "left" || jus == "right")
        {
            justify.value = 'left';
        } else {
            font_size.value = fz;
            justify.value = jus;
        }
    } else {choose_style.style.display = 'none';}
    
}

function set_style() {
    if(c.getActiveObject() == undefined)
    {
        default_text.fontSize = font_size.value;
        default_text.textAlign = justify.value;
    } else {
        c.getActiveObject().fontSize = font_size.value;
        c.getActiveObject().textAlign = justify.value;
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
        custom_or_buildin_template.style.display = 'none';

        drawImage()
        choose_template()

    }, {once: true})
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

function saveImage()
{   
    let image = new Image();

    image.onload = () => {
        image_to_save.setAttribute("href", image.src);
        image_to_save.click()
    }

    image.src = c.toDataURL({fotmat: 'png'});


}

function removeObject()
{
    c.remove(c.getActiveObject())
}