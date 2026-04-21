let startTime
let timer
let waiting = false

let bestReaction = localStorage.getItem("bestReaction")

if(bestReaction){
    document.getElementById("bestReaction").innerText = bestReaction + " ms"
}

function startReaction(){

    let box = document.getElementById("reactionBox")
    let result = document.getElementById("reactionResult")

    clearTimeout(timer)

    box.style.background = "red"
    box.innerText = "Wait..."
    result.innerText = ""

    waiting = true

    let delay = Math.random() * 3000 + 2000

    timer = setTimeout(()=>{
        box.style.background = "green"
        box.innerText = "CLICK!"
        startTime = Date.now()
        waiting = false
    }, delay)

}

function stopReaction(){

    let box = document.getElementById("reactionBox")

    if(waiting){
        clearTimeout(timer)
        document.getElementById("reactionResult").innerText =
        "Too soon! Wait for green."
        box.innerText = "Click Start Again"
        return
    }

    if(box.style.background === "green"){

        let reactionTime = Date.now() - startTime
        let rating = ""

if(reactionTime < 150){
    rating = "⚡ Pro Gamer"
}else if(reactionTime < 200){
    rating = "🔥 Very Fast"
}else if(reactionTime < 250){
    rating = "👍 Good"
}else if(reactionTime < 300){
    rating = "🙂 Average"
}else{
    rating = "🐢 Slow"
}
       document.getElementById("reactionResult").innerText =
"Reaction time: " + reactionTime + " ms | Rating: " + rating

        if(!bestReaction || reactionTime < bestReaction){

            bestReaction = reactionTime

            localStorage.setItem("bestReaction", bestReaction)

            document.getElementById("bestReaction").innerText =
            bestReaction + " ms"
        }

        box.innerText = "Click Start Again"
        box.style.background = "#576A8F"

    }

}