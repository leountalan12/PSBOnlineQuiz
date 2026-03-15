let peer=new Peer("teacher")

let students={}

peer.on("connection",conn=>{

conn.on("data",data=>{

if(data.type==="join"){

addStudent(data.name,data.peerId)

}

})

})

function addStudent(name,peerId){

const grid=document.getElementById("studentGrid")

const card=document.createElement("div")

card.className="studentCard"

card.innerHTML=`

<h3>${name}</h3>

<video id="video_${peerId}" autoplay></video>

<p id="status_${peerId}">Monitoring</p>

`

grid.appendChild(card)

const call=peer.call(peerId,null)

call.on("stream",stream=>{

document.getElementById("video_"+peerId).srcObject=stream

})

students[peerId]=name

document.getElementById("studentCount").innerText=
"Students Connected: "+Object.keys(students).length

}