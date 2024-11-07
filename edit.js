const draw = document.getElementById('draw');
const text = document.getElementById('text');
const remove = document.getElementById('remove');
const bubble = document.getElementById('bubble');
const bubbleImg = document.getElementById('bubble-image');
const save = document.getElementById('download');
const font = document.getElementById('font-family');
const clear = document.getElementById('clear');
const strokeWidth = document.getElementById('width-size');
const canvasContainer = document.getElementById('canvas-wrapper');
const colorBtns = document.querySelectorAll('.color-option');
const strokeColorPicker = document.getElementById("stroke-color-picker");
const selectedColorBtn = document.querySelector('.color-options .selected');

const textColorBtns = document.querySelectorAll('.text-color-option');
const textColorPicker = document.getElementById("text-color-picker");
const selectedTextColorBtn = document.querySelector('.text-color-options .selected');

let canvasScreenWidth = 700, canvasScreenHeight = 500;
console.log(innerWidth);
if (innerWidth < 576) {
    canvasScreenWidth = 350;
    canvasScreenHeight = 500;
}

const templateInfo = JSON.parse(localStorage.getItem('templateInfo'));
console.log(templateInfo);
const imgId = templateInfo['img'];
const scaleWidth = canvasScreenWidth / templateInfo['width'];
const scaleHeight = canvasScreenHeight / templateInfo['height'];
const scaleFactor = Math.min(scaleWidth, scaleHeight);

const canvas = new fabric.Canvas('canvas', { // id we use in the template
    isDrawingMode: false,
    width: templateInfo['width'] * scaleFactor,
    height: templateInfo['height'] * scaleFactor,
});

const templateURL = `./assets/images/img${imgId}.jpeg`

fabric.Image.fromURL(templateURL, function (img) {
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: scaleFactor,
        scaleY: scaleFactor,
        originX: 'left',
        originY: 'top',
    });
});

// 초기 브러쉬 색상
let selectedColor = window.getComputedStyle(selectedColorBtn).getPropertyValue("background-color");
// 초기 텍스트 색상
let selectedTextColor = window.getComputedStyle(selectedTextColorBtn).getPropertyValue("background-color");

// 드로잉 섹션
draw.addEventListener('click', function () {
    // 드로잉 모드 toggle
    console.log("free drawing activated");
    draw.classList.toggle("active");
    canvas.isDrawingMode = !canvas.isDrawingMode;

    if (canvas.freeDrawingBrush) {
        const brush = canvas.freeDrawingBrush;
        brush.color = selectedColor;
        brush.width = parseInt(strokeWidth.value) || 10;
    }
});

// 브러쉬 색상 변경
colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".color-options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
        canvas.freeDrawingBrush.color = selectedColor;
        console.log(btn);
    })
});

// color picker의 버튼 색상 변경 및 변경 색상 적용
strokeColorPicker.addEventListener("change", () => {
    strokeColorPicker.parentElement.style.background = strokeColorPicker.value;
    strokeColorPicker.parentElement.click();
})

strokeWidth.onchange = function () {
    canvas.freeDrawingBrush.width = parseInt(this.value);
}


// 텍스트 섹션
text.addEventListener('click', function () {
    deactivateDrawingMode();
    const textBox = new fabric.IText('Text', {
        left: 40,
        top: 40,
        objecttype: 'text',
        fontFamily: font.value,
        fill: selectedTextColor
    });
    canvas.add(textBox).setActiveObject(textBox);

    // 글꼴 바꾸기
    font.onchange = function () {
        newFont = this.value;
        canvas.getActiveObject().set("fontFamily", newFont);
        canvas.requestRenderAll();
    }
});

// 텍스트 색상 변경
textColorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("text clicked")
        document.querySelector(".text-color-options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedTextColor = window.getComputedStyle(btn).getPropertyValue("background-color");

        canvas.getActiveObject().set("fill", selectedTextColor);
        canvas.requestRenderAll();
        console.log(btn);
    })
});

// 텍스트 color-picker 버튼 색상 맞춰서 변경
textColorPicker.addEventListener("change", () => {
    textColorPicker.parentElement.style.background = textColorPicker.value;
    textColorPicker.parentElement.click();
})

// 부분 삭제
remove.addEventListener('click', function () {
    deactivateDrawingMode();
    canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj);
    });
    canvas.discardActiveObject().renderAll();
});

// 말풍선 추가
bubble.addEventListener('click', function () {
    deactivateDrawingMode();
    let image = new fabric.Image(bubbleImg, {
        left: 100,
        top: 100,
    });

    image.scaleToWidth(100, false);
    canvas.add(image);
    console.log("image added");
});

// 전체 삭제
clear.addEventListener('click', function () {
    deactivateDrawingMode();
    canvas.getObjects().forEach((obj) => {
        if (obj !== canvas.setBackgroundImage) {
            canvas.remove(obj);
        }
    });
    canvas.renderAll();
});

// 밈 저장
save.addEventListener('click', function () {
    deactivateDrawingMode();
    let canvasURL = canvas.toDataURL("image/png", 1);
    console.log(canvasURL);
    const createEl = document.createElement('a');
    createEl.href = canvasURL;

    createEl.download = "canvasImg.png"

    createEl.click();
    createEl.remove();
});

// 드로잉 모드 해제
function deactivateDrawingMode() {
    if (canvas.isDrawingMode) {
        draw.classList.toggle("active");
        canvas.isDrawingMode = false;
    }
}