var prediction_1 = "";
var prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 100
});

camera = document.getElementById("Webcam1");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src = '" + data_uri + "'>";
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/o3m8Uce7f/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.SpeechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function prediction() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_name1").innerHTML = results[0].label;
        document.getElementById("result_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "Happy") {
            document.getElementById("result_emoji1").innerHTML = "&#128515;";
        }
        if (results[0].label == "Angry") {
            document.getElementById("result_emoji1").innerHTML = "&#128544;";
        }
        if (results[0].label == "Sad") {
            document.getElementById("result.emoji1").innerHTML = "&#128542;";
        }
        if (results[0].label == "Crying") {
            document.getElementById("result_emoji1").innerHTML = "&#128557;";
        }
        if (prediction_2 == "Happy") {
            document.getElementById("result_emoji2").innerHTML = "&#128515;";
        }
        if (prediction_2 == "Sad") {
            document.getElementById("result_emoji2").innerHTML = "&#128542;";
        }
        if (prediction_2 == "Angry") {
            document.getElementById("result_emoji2").innerHTML = "&#128544;";
        }
        if (prediction_2 == "Crying") {
            document.getElementById("result_emoji2").innerHTML = "&#128557;";
        }
    }
}