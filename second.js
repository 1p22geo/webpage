class Frequency{
/**
     * @param {number} [f]
     * @param {number} [A]
     * @param {number} [theta]
     */
 constructor({ f = 1, A = 1 , theta = 0} = {}) {
    this.f = f;
    this.A = A;
    this.theta = theta;
  }
}
const freqsdiv = document.getElementById('freqs');
let frequencies = [];
let freqCount = 1;

let π = Math.PI;

function addF(){
    let fdiv = document.createElement('div');
    fdiv.classList.add('freq');
    let h3 = document.createElement('h3');
    h3.innerHTML = 'Harmonic frequency '+freqCount;
    freqCount++;
    fdiv.appendChild(h3);
    let p = document.createElement('p');
    let text = document.createTextNode('1 Hz');
    p.appendChild(text);
    let slider = document.createElement('input');
    slider.name = "frequency";
    slider.type = 'range';
    slider.min = 1;
    slider.max = 100;
    slider.value = 50;
    p.appendChild(slider);
    text = document.createTextNode('100 Hz');
    p.appendChild(text);
    fdiv.appendChild(p);

    h3 = document.createElement('h3');
    h3.innerHTML = 'Amplitude';
    fdiv.appendChild(h3);
    p = document.createElement('p');
    text = document.createTextNode('0%');
    p.appendChild(text);
    slider = document.createElement('input');
    slider.name = "amplitude";
    slider.type = 'range';
    slider.min = 0;
    slider.max = 100;
    slider.value = 50;
    p.appendChild(slider);
    text = document.createTextNode('100%');
    p.appendChild(text);
    fdiv.appendChild(p);

    h3 = document.createElement('h3');
    h3.innerHTML = 'Phase shift';
    fdiv.appendChild(h3);
    p = document.createElement('p');
    text = document.createTextNode('- π rad');
    p.appendChild(text);
    slider = document.createElement('input');
    slider.name = "phase";
    slider.type = 'range';
    slider.min = 0;
    slider.max = 100;
    slider.value = 50;
    p.appendChild(slider);
    text = document.createTextNode('π rad');
    p.appendChild(text);
    fdiv.appendChild(p);


    freqsdiv.appendChild(fdiv);
}

function saveFile(){
    const link = document.createElement("a");
  
  // Create a blog object with the file content which you want to add to the file
  const file = new Blob(['1,0,0,1'], { type: 'text/plain' });
  
  // Add file content in the object URL
  link.href = URL.createObjectURL(file);
  
  // Add file name
  link.download = "sample.txt";
  
  // Add click event to <a> tag to save file.
  link.click();
  URL.revokeObjectURL(link.href);
    
  }