const loading = document.getElementById("loading");
const custom_or_buildin_template = document.getElementById('custom_or_buildin_template');
const choose_style = document.getElementById("choose_style");

const font_size = document.getElementById("font_size");
const justify = document.getElementsByName("justify");
const textColor = document.getElementById("textColor");

const buildin_templates = document.getElementById("buildin_templates");
const templates = document.getElementById("templates"); // show buildin templates

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

let already_show_templates = false;
function show_buildin_templates()
{
    choose_template(); // Don't display custom_or_buildin_template
    if(buildin_templates.style.display != 'block')
    {
        // Load and show build in templates
        buildin_templates.style.display = 'block';

        let id = 0;
        for(let num=1; num < 20; num++) {
            // for loop 1 - 17 will load images from 1 to 16
            let fReader =  new FileReader();
            
            if(already_show_templates == false) {
                fReader.onloadend = (e) => {
                    templates.innerHTML += `<img src="${e.target.result}" id="${id}" loading="lazy" onclick="drawImage(true, this.id)">`;
                    id++;
                    if(id >= 19) {
                        document.getElementById("tp_loading").style.display = 'none';
                    }
                }
            }
            
            fetch(`./images/${num}.jpeg`).then((data) => {
                return data.blob()
            }).then((data) => {
                fReader.readAsDataURL(data);
            })
        }

        already_show_templates = true;
    } else {
        buildin_templates.style.display = 'none';
    }
}

function custom_tp()
{
    buildin_templates.style.display = 'none';
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

    let tb = c.height - 13; // text bottom
    let tr = c.width - 108; // text right
    let wm = new fabric.Text("https://bit.ly/donatebymemes", {fontSize: 9, left: tr, top: tb, underline: true});

    image.onload = () => {
        c.setWidth(canvas_config.width);
        c.setHeight(canvas_config.height);

        image_to_save.setAttribute("href", image.src);
        image_to_save.click();

        c.setZoom(1);
        c.setWidth(canvas_config.width);
        c.setHeight(canvas_config.height);
        c.remove(wm);
    }

    c.add(wm);
    
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
