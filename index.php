<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <header>
        <h1>Discrete Fourier Transform</h1>
    </header>
    <div class="container">
    <section class="spacing"></section>
    <div>
    <div class="container">
        <article>
            <header><h2>Input the dataset here</h2></header>
            <textarea rows="10" cols="50" id="input"></textarea>
            <h4>Or use a file</h4>
            <input type="file" name="inputfile" id="inputfile">
            <h4>Sampling frequency [Hz]</h4>
            <input id="f"/>
            <br/><br/>
            <button onclick="toggle()">Toggle advanced options</button>
            <div id="adv">
                <h4 class="tooltip">Summary list treshold<span class="tooltiptext">Selection rule according to the selection of checkboxes titled "Frequency selection method"</span></h4>
                <br/>
                <input id="min_amp"/>
                <br/>
                <h4 class="tooltip">Frequency list treshold<span class="tooltiptext">The program tries to evaluate only the meaningful frequencies - the top 1/X of them</span></h4>
                <br/>
                <input id="top_freq"/>
                <br/>
                <h4>Frequency selection method</h4>
                <br/>
                <input class="messageCheckbox" type="checkbox" value="1" name="topf">The top X frequencies<br>
                <input class="messageCheckbox" type="checkbox" value="2" name="topf">Frequencies with an amplitude X times less than max
                <br/>
                <h4 class="tooltip">Use advanced graph<span class="tooltiptext">Graph both phase and amplitude of frequencies</span></h4>
                <br/>
                <input class="messageCheckbox" type="checkbox" value="1" name="advg"><br>

                <br/>
            </div>
            <br/>
            <br/>
            <button onclick="textInput()">Calculate</button>
            <pre id="output"></pre>
        </article>
        <article>
            <header><h2>Your detected frequencies</h2></header>
            <table id="table">
                <tr>
                    <th>Frequency</th>
                    <th>Amplitude</th>
                    <th>Phase shift</th>
                </tr>
            </table>
        </article>
    </div>
    <div id="graph">
        <h4>Frequency spectre graph</h4>
    </div>
    </div>
    <section class="spacing"></section>
    </div>
    <footer>Bartosz G 2022<br/><br/><a href="second.php">Data set generator</a></footer>
    <script src="main.js"></script>
</body>
</html>