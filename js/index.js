function initColor() {
  document.querySelector(
    '#backgroundColorPicker > input'
  ).value = randomColorGenerator();
}

function randomColorGenerator() {
  var bg_colour = Math.floor(Math.random() * 16777215).toString(16);
  bg_colour = '#' + ('000000' + bg_colour).slice(-6);
  return bg_colour;
}

function drawCanvas() {
  const textfield = document.querySelector('#textfield');
  const text = textfield.value;

  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 폰트
  const color = document.querySelector('#fontColorPicker > input').value;
  const fontFamily = 'Helvetica';

  // 배경색
  const backgroundColor = document.querySelector(
    '#backgroundColorPicker > input'
  ).value;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const fontSize = document.querySelector('#inputGroupSelect01').value;

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  ctx.fillStyle = color;

  const defaultWidth = canvas.width / 2;
  const defaultHeight = canvas.height / 2;

  const fontHeight = fontSize * 1.4;
  const SEPARATOR = '\n';
  const lines = text.split(SEPARATOR);

  if (lines.length % 2) {
    lines.map((line, index) => {
      const middle = parseInt((lines.length / 2).toString(), 10);
      const h = defaultHeight + (index - middle) * fontHeight;
      ctx.fillText(line, defaultWidth, h);
      return null;
    });
  } else {
    const mid = (lines.length - 1) / 2;
    const offsets = lines
      .map((line, index) => index)
      .reduce((prev, curr) => {
        const subtract = curr - mid;
        prev.push([subtract < 0, parseInt(subtract.toString(), 10)]);
        return prev;
      }, []);
    offsets.map(([sign, offset], index) => {
      const position = offset * fontHeight;
      const e = sign ? (fontHeight / 2) * -1 : fontHeight / 2;
      const h = defaultHeight + position + e;
      ctx.fillText(lines[index], defaultWidth, h);
      return null;
    });
  }
}

function saveBanner() {
  const textfield = document.querySelector('#textfield');
  const text = textfield.value;

  const sel = document.querySelector('#myCanvas');
  const filename = 'banner-maker ';
  saveAs(sel.toDataURL(), filename + text + '.png');
}

function copyBanner() {
  console.log(`copyBanner`);

  const canvas = document.querySelector('#myCanvas');

  canvas.toBlob(function (blob) {
    const item = new ClipboardItem({ 'image/png': blob });
    navigator.clipboard.write([item]);
  });
}

function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

function initCanvas() {
  const canvasWidth = document.querySelector(
    'body > div > div:nth-child(2) > div:nth-child(1) > input'
  );
  const canvasHeight = document.querySelector(
    'body > div > div:nth-child(2) > div:nth-child(2) > input'
  );

  const width = canvasWidth.value;
  console.log('what', canvasWidth.value);
  document.querySelector('#myCanvas').width = width;
  document.querySelector('#textfield').style.width = `${width}px`;

  const height = canvasHeight.value;
  console.log('what', canvasHeight.value);
  document.querySelector('#myCanvas').height = height;

  drawCanvas();
}

// 초기화
initColor();
initCanvas();
