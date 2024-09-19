const draw = document.getElementById('draw');
const text = document.getElementById('text');
const remove = document.getElementById('remove');
const bubble = document.getElementById('bubble');
const bubbleImg = document.getElementById('bubble-image');
const save = document.getElementById('download');
const font = document.getElementById('font-family');
const textColour = document.getElementById('text-color');
const clear = document.getElementById('clear');
const strokeColour = document.getElementById('stroke-color');
const strokeWidth = document.getElementById('width-size');
const drawLabel = document.querySelector('label[for="draw"]');


const canvas = new fabric.Canvas('canvas', { // id we use in the template
    isDrawingMode: false,
    width: 700,
    height: 500,
});

const selectedTempNum = localStorage.getItem('selectedTemp');
// const templateURL = `https://raw.githubusercontent.com/suminb99/2024-MYP/main/assets/images/img${selectedTempNum}.jpeg`
const templateURL = `./assets/images/img${selectedTempNum}.jpeg`

console.log(templateURL.width);

fabric.Image.fromURL(templateURL, function(img) {
    const originalWidth = img.width;
    const originalHeight = img.height;

    const scaleWidth = 700 / originalWidth;
    const scaleHeight = 500 / originalHeight; 

    const scaleFactor = Math.min(scaleWidth, scaleHeight);

    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: scaleFactor,
        scaleY: scaleFactor,
        originX: 'center',
        originY: 'center',
        left: 700/2,
        top: 500/2,
    });

});

// 드로잉
draw.addEventListener('click', function() {
    console.log("free drawing activated");
    canvas.isDrawingMode = !canvas.isDrawingMode;
    if (draw.className === "active" && drawLabel.className === "active") {
        draw.className = "";
        drawLabel.className = "";
    } else {
        draw.className = "active";
        drawLabel.className = "active";
    }

    if (canvas.freeDrawingBrush) {
        const brush = canvas.freeDrawingBrush;
        brush.color = strokeColour.value;
        brush.width = parseInt(strokeWidth.value) || 10;
    }
}); 

strokeColour.onchange = function() {
    console.log(strokeColour)
    canvas.freeDrawingBrush.color = this.value;
}

strokeWidth.onchange = function() {
    canvas.freeDrawingBrush.width = parseInt(this.value);
}


// 텍스트 추가
text.addEventListener('click', function() {
    canvas.isDrawingMode = false;
    const textBox = new fabric.IText('Text', {
        left: 40,
        top: 40,
        objecttype: 'text',
        fontFamily: font.value,
        fill: textColour.value
    });
    canvas.add(textBox).setActiveObject(textBox);

    // 글꼴 바꾸기
    font.onchange = function() {
        newFont = this.value;
        canvas.getActiveObject().set("fontFamily", newFont);
        canvas.requestRenderAll();
    }

    // 색상 바꾸기
    textColour.onchange = function() {
        newColour = this.value;
        canvas.getActiveObject().set("fill", newColour);
        canvas.requestRenderAll();
    }
});


// 지우기
/*
remove.addEventListener('click', function() {
    canvas.isDrawingMode = false;
    canvas.remove(canvas.getActiveObject());
});

canvas.on('selection:created', function() {
    remove.removeAttribute('disabled');
});

canvas.on('selection:cleared', function() {
    remove.setAttribute('disabled', 'disabled');
});
*/

remove.addEventListener('click', function() {
    canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj);
    });
    canvas.discardActiveObject().renderAll();
});

bubble.addEventListener('click', function() {
    let image = new fabric.Image(bubbleImg, {
        left: 100,
        top: 100,
    });

    image.scaleToWidth(100, false);
    canvas.add(image);
    console.log("image added");
});

clear.addEventListener('click', function() {
    canvas.getObjects().forEach((obj) => {
        if (obj !== canvas.setBackgroundImage) {
            canvas.remove(obj);
        }
    });
    canvas.renderAll();
});

save.addEventListener('click', function() {
    let canvasURL = canvas.toDataURL("image/png", 1);
    console.log(canvasURL);
    const createEl = document.createElement('a');
    createEl.href = canvasURL;

    createEl.download = "canvasImg.png"

    createEl.click();
    createEl.remove();
});