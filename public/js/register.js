const type = document.getElementById("participantType")

const leaderMits = document.getElementById("leaderMitsFields")
const leaderNonMits = document.getElementById("leaderNonMitsFields")

type.addEventListener("change", () => {

if(type.value === "mits"){

leaderMits.style.display = "block"
leaderNonMits.style.display = "none"

}

else if(type.value === "nonmits"){

leaderMits.style.display = "none"
leaderNonMits.style.display = "block"

}

})
const teamSize = document.getElementById("teamSize")
const participantType = document.getElementById("participantType")
const membersContainer = document.getElementById("membersContainer")

function generateMembers(){

membersContainer.innerHTML = ""

if(!teamSize.value || !participantType.value) return

// TEAM SIZE RULE
let count = teamSize.value === "duo" ? 1 : 3

for(let i=1;i<=count;i++){

let extraField = participantType.value === "mits"
? '<input type="text" placeholder="Enrollment Number" required>'
: '<input type="text" placeholder="College Name" required>'

membersContainer.innerHTML += `

<div class="member">

<h3>Member ${i}</h3>

<input type="text" placeholder="Member Name" required>

<input type="email" placeholder="Member Email" required>

<input type="tel" placeholder="Member Phone" required>

${extraField}

</div>

`

}

}

teamSize.addEventListener("change",generateMembers)
participantType.addEventListener("change",generateMembers)