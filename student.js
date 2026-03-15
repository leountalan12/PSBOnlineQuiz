let peer
let conn

let stream
let violations=0

const maxViolations=3

const video=document.getElementById("camera")

document.getElementById("startExam").onclick=startExam

async function startExam(){

let name=document.getElementById("studentName").value

if(name===""){
alert("Enter name first")
return
}

stream=await navigator.mediaDevices.getUserMedia({video:true})

video.srcObject=stream

peer=new Peer()

peer.on("open",id=>{

conn=peer.connect("teacher")

conn.on("open",()=>{

conn.send({
type:"join",
name:name,
peerId:id
})

})

})

startTimer()

monitorTab()

}

function startTimer(){

let seconds=1800

setInterval(()=>{

let m=Math.floor(seconds/60)
let s=seconds%60

document.getElementById("timer").innerText=
m+":"+String(s).padStart(2,"0")

seconds--

},1000)

}

function monitorTab(){

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

violations++

sendEvent("tabSwitch")

if(violations>=maxViolations){

alert("Exam terminated")

location.reload()

}

}

})

}

function sendEvent(type){

if(conn){

conn.send({
type:type
})

}

}