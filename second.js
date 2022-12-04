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
    
    fdiv.appendChild(h3);
    let p = document.createElement('p');
    let text = document.createTextNode('1 Hz');
    p.appendChild(text);
    let slider = document.createElement('input');
    slider.name = "frequency";
    slider.type = 'range';
    slider.min = 1;
    slider.max = 50;
    slider.value = 50;
    slider.step = 1;
    p.appendChild(slider);
    text = document.createTextNode('50 Hz');
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

    freqCount++;
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

function calculate(){
    let samplingF = document.getElementById('f').value;
    let N = document.getElementById('N').value;

    let frequencies = document.getElementsByName('frequency');
    let amplitudes = document.getElementsByName('amplitude');
    let phase_shifts = document.getElementsByName('phase');

    let values = [];

    if(!samplingF||!N){return;}
    //let v = 1//(1/(2*π*(1/samplingF**2)*N));
    unitF = samplingF/N;
    for(let sample = 0; sample<N; sample+=1){
        values[sample] = 0;
        for (let i = 0; i < frequencies.length; i++) {
            values[sample]+=((amplitudes[i].value)/100)*Math.cos((sample/N)*2*π*((frequencies[i].value)/unitF));
            
        }
    }

    const link = document.createElement("a");

    // Create a blog object with the file content which you want to add to the file
    const file = new Blob([values.join(',')], { type: 'text/plain' });

    // Add file content in the object URL
    link.href = URL.createObjectURL(file);

    // Add file name
    link.download = "sample.txt";

    // Add click event to <a> tag to save file.
    link.click();
    URL.revokeObjectURL(link.href);
}