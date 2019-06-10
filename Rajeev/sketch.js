// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBak8VhxpHaVAkdRveO1L7rNaFgxuoUb3I",
  authDomain: "lebron-a7454.firebaseapp.com",
  databaseURL: "https://lebron-a7454.firebaseio.com",
  projectId: "lebron-a7454",
  storageBucket: "lebron-a7454.appspot.com",
  messagingSenderId: "24496805736",
  appId: "1:24496805736:web:6559991994f06f05"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database()

let badguys
let x
let y
let e
let f 
let b 
let c
let direction
let direction2
let score
let level
let time
let lebron = document.getElementById("lebron") 
let scoreboard = { }

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 200
  y = 500
  b = 300
  c = 400
  badguys=3
  e = [350, 250, 450,550,600,220,140,340]
  f = [600,500,400,200,100,210, 340,410]
  level=1
  time=300
  direction=1
  direction2 =  [1,1,1,1,1,1,1,1]
  score=10
}

function draw() {
  if (time > 0) {

  background(120,140,100);
  circle(x,y,45)
  fill(0,0,250)
 
if (touches.length == 0)   {
}

  
 if (keyIsDown(LEFT_ARROW)){
    x = x - 5
  }
   if (keyIsDown(RIGHT_ARROW)){
    x = x + 5
  }
  if (keyIsDown(UP_ARROW)){
    y = y - 5
  }
  if (keyIsDown(DOWN_ARROW)){
    y = y + 5
  }
else { 
x = touches[0].x
y = touches[0].y
}


  circle(b,c,60)
  fill(100,55,100)
  b=b+5*direction
  if ( b > width || b < 0) {
	direction = direction*-1
  }
  


  textSize(25)
  text("score:" + score,150,50)
  text("time: " + time.toFixed(0) ,400,20)
  time = time-0.2
  if (dist( x, y, b, c, ) < 45 + 60 ) {
	score = score + 1
  }
  


  
  
for (i=0; i<badguys; i=i+1) {
  fill(139,45,835)
  circle(e[i],f[i],45)

  e[i]=e[i]+5*direction2[i]
  if ( e[i] > width || e[i] < 0) {
	direction2[i] = direction2[i]*-1
  }
  if (dist( x, y, e[i], f[i] ) < 45 + 45 ) {
	score = score -1
  }    
}
  
  if (score > 200 && level == 1) {
badguys= badguys+ 2
level = 2
}
if (score > 300 && level == 2) {
badguys= badguys+ 1
level = 3
}
  if (score > 400 && level == 3) {
badguys= badguys+ 1
level = 4
}  
  if (score > 500 && level == 4) {
badguys= badguys+ 1
level = 5
}  
  }
  else {
    lebron.innerHTML = "Name? <input id='tatum'><button onclick='restart()'>Restart</button><button onclick='generate_alltime_leaderboard()'>All-time leaderboard</button>"
  noLoop()
    
    


}

  
}
function restart() { 
        let tatum= document.getElementById("tatum")
		name = tatum.value 
	    database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
        alert("scoreboard: "+JSON.stringify(scoreboard,null,1)) 
		time = 300
		score = 10
		loop()
		lebron.innerHTML = ""
        generate_leaderboard()
}
function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}



function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
