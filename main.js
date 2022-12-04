class ComplexNumber {
    /**
     * @param {number} [re]
     * @param {number} [im]
     */
    constructor({ re = 0, im = 0 } = {}) {
      this.re = re;
      this.im = im;
    }
    /**
     * @param {ComplexNumber|number} added
     * @return {ComplexNumber}
     */
    add(added) {
      const complexAddend = this.toComplexNumber(added);
  
      return new ComplexNumber({
        re: this.re + complexAddend.re,
        im: this.im + complexAddend.im,
      });
    }
  
    /**
     * @param {ComplexNumber|number} substracted
     * @return {ComplexNumber}
     */
    subtract(substracted) {
      const complexSubtrahend = this.toComplexNumber(substracted);
  
      return new ComplexNumber({
        re: this.re - complexSubtrahend.re,
        im: this.im - complexSubtrahend.im,
      });
    }
  
    /**
     * @param {ComplexNumber|number} multiplied
     * @return {ComplexNumber}
     */
    multiply(multiplied) {
      const complexMultiplicand = this.toComplexNumber(multiplied);
  
      return new ComplexNumber({
        re: this.re * complexMultiplicand.re - this.im * complexMultiplicand.im,
        im: this.re * complexMultiplicand.im + this.im * complexMultiplicand.re,
      });
    }
  
    /**
     * @param {ComplexNumber|number} divider
     * @return {ComplexNumber}
     */
    divide(divider) {
      const complexDivider = this.toComplexNumber(divider);
  
      const dividerConjugate = this.conjugate(complexDivider);
  
      const finalDivident = this.multiply(dividerConjugate);
  
      const finalDivider = (complexDivider.re ** 2) + (complexDivider.im ** 2);
  
      return new ComplexNumber({
        re: finalDivident.re / finalDivider,
        im: finalDivident.im / finalDivider,
      });
    }
  
    /**
     * @param {ComplexNumber|number} number
     */
    conjugate(number) {
      const complexNumber = this.toComplexNumber(number);
  
      return new ComplexNumber({
        re: complexNumber.re,
        im: -1 * complexNumber.im,
      });
    }
  
    /**
     * @return {number}
     */
    getRadius() {
      return Math.sqrt((this.re ** 2) + (this.im ** 2));
    }

    /**
   * @return {number}
   */
    getPhase() {
    let phase = Math.atan(Math.abs(this.im) / Math.abs(this.re));

    if (this.re < 0 && this.im > 0) {
      phase = Math.PI - phase;
    } else if (this.re < 0 && this.im < 0) {
      phase = -(Math.PI - phase);
    } else if (this.re > 0 && this.im < 0) {
      phase = -phase;
    } else if (this.re === 0 && this.im > 0) {
      phase = Math.PI / 2;
    } else if (this.re === 0 && this.im < 0) {
      phase = -Math.PI / 2;
    } else if (this.re < 0 && this.im === 0) {
      phase = Math.PI;
    } else if (this.re > 0 && this.im === 0) {
      phase = 0;
    } else if (this.re === 0 && this.im === 0) {
      phase = 0;
    }
    return phase;
  }
    /**
     * @param {ComplexNumber|number} number
     * @return {ComplexNumber}
     */
    toComplexNumber(number) {
      if (number instanceof ComplexNumber) {
        return number;
      }
  
      return new ComplexNumber({ re: number });
    }
  }

  function dft(inputAmplitudes, zeroThreshold = 1e-3) {
    const N = inputAmplitudes.length;
    const signals = [];
  
    for (let frequency = 0; frequency < N; frequency += 1) {
      let frequencySignal = new ComplexNumber();
  
      for (let timer = 0; timer < N; timer += 1) {
        const currentAmplitude = inputAmplitudes[timer];
  
        const rotationAngle = -1 * (2 * Math.PI) * frequency * (timer / N);
  
        const dataPointContribution = new ComplexNumber({
          re: Math.cos(rotationAngle),
          im: Math.sin(rotationAngle),
        }).multiply(currentAmplitude);
  
        frequencySignal = frequencySignal.add(dataPointContribution);
      }
  
      if (Math.abs(frequencySignal.re) < zeroThreshold) {
        frequencySignal.re = 0;
      }
  
      if (Math.abs(frequencySignal.im) < zeroThreshold) {
        frequencySignal.im = 0;
      }
  
      frequencySignal = frequencySignal.divide(N);
  
      signals[frequency] = frequencySignal;
    }
  
    return signals;
  }

/*const arr = [1,4,3,4,2,3,2,1];
transformed = dft(arr);


for (let n = 0; n < transformed.length; n++) {
  let element = transformed[n];
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  let td1 = document.createElement("th");
  let td2 = document.createElement("th");
  td1.innerHTML = element.re.toFixed(3);
  td2.innerHTML = element.im.toFixed(3);
  th.innerHTML = n+1+'f';
  tr.appendChild(th);
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
*/
let table = document.getElementById('table')

let tableRows = 1;
let bars = 0;

let adv = false;
let min = 20;
let topf = 10;
let method = 0;

function toggle(){
  if(adv){
    document.getElementById('adv').style.display = "none";
  }
  else{
    document.getElementById('adv').style.display = "block";
  }
  adv = !adv;
}

function textInput(){
  
  let text = document.getElementById('input').value;
  if(text == ''){return}
  let array = text.split(',');
  summary(array)
}
function summary(array){
  let cboxes = document.getElementsByName('topf');
  if(cboxes[0].checked&&!cboxes[1].checked){
    method = 0;
  }
  else if(cboxes[1].checked&&!cboxes[0].checked){
    method = 1;
  }
  let m = document.getElementById('min_amp').value;
  if(m && !isNaN(1/m)){
  min = m;
  }
  let t = document.getElementById('top_freq').value;
  if(t && !isNaN(1/t)){
  topf = t;
  }
  let freq = document.getElementById('f').value;
  for(;tableRows>1; tableRows--){
    document.getElementsByTagName('tr')[1].remove();
  }
  for(;bars>0; bars--){
    document.getElementsByTagName('p')[0].remove();
  }
  let transformed = dft(array);
  let N = array.length;
  let summary = [];
  for (let i = 0; i < N/topf; i++) {
    let iterator = transformed[i];
    summary.push(iterator.getRadius());
  }
  let phaseSummary = [];
  for (let i = 0; i < N/topf; i++) {
    let iterator = transformed[i];
    let p = iterator.getPhase();
    if(p<0){
      p = 2*Math.PI+p
    }
    phaseSummary.push(p);
  }
  let max = Math.max(...summary);

  for (let n = 0; n < N/topf; n++) {
    let element = transformed[n];
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td1 = document.createElement("th");
    let td2 = document.createElement("th");
    td1.innerHTML = summary[n].toPrecision(3);
    td2.innerHTML = phaseSummary[n].toPrecision(3);
    let f = 1/((N/n)/freq);

    th.innerHTML = (f).toPrecision(3)+' Hz';
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    const sorted = [...summary].sort().reverse();
    if(((sorted.indexOf(element.getRadius())<min)&&method==0)||((element.getRadius()>max/min)&&method==1)){
    table.appendChild(tr);
    tableRows += 1;
    }
  }
  for (let i = 0; i < summary.length; i++) {
    const iterator = summary[i];
    let p = document.createElement("p");
    let number = iterator/max*100;
    let number2 = (1-phaseSummary[i]/(Math.PI*2))*100;
    text = ''
    if(i%5==0){
      text += (1/((N/i)/freq)).toPrecision(3)+' Hz';
    }
    let needed = 10-(text.length);
    for (let j = 0; j < needed; j++) {
      text+='&nbsp'
    }
    text+='|'
    for (let j = 0; j < 100; j++) {
      if(document.getElementsByName('advg')[0].checked){
        if((j<number)&&(j>number2)){
          text += '#'
        }
        else if(j<number){
          text += '|'
        }
        else if(j>number2){
          text += '-'
        }
        else{
          text +='&nbsp'
        }
      }
      else{
        if((j<number)&&(j>number2)){
          text += '#'
        }
        else if(j<number){
          text += '#'
        }
        else if(j>number2){
          text += '&nbsp'
        }
        else{
          text +='&nbsp'
        }
    }
    }
    p.innerHTML = text;
    document.getElementById('graph').appendChild(p);
    bars++;
 
  }
}


document.getElementsByName('inputfile')[0].addEventListener('change', function(){
  let fr=new FileReader();
  fr.onload=function(){
    let text = fr.result;
    if(text == ''){return}
    let array = text.split(',');
    summary(array);
    document.getElementById('input').value = text;
  }
  fr.readAsText(this.files[0]);
  document.getElementsByName('inputfile')[0].value = null;
})
/* 

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
*/