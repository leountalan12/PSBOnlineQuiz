let model

async function loadModel(){

model=await blazeface.load()

monitorFace()

}

loadModel()

function monitorFace(){

setInterval(async()=>{

if(!video.videoWidth) return

const predictions=await model.estimateFaces(video,false)

if(predictions.length===0){

sendEvent("faceMissing")

}

},3000)

}