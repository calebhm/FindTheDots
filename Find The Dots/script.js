var pt = {x: 0, y: 0, distp: 0};
var foundpt = [];
var winx = window.innerWidth;
var winy = window.innerHeight;
var maxsize = 80;
var mindist = winx * 0.25;
var looking = true;
var cooldown = 0;
var score = 0;
var x = 0;
var y = 0;
var count = 0;

function setup() {
    createCanvas(winx, winy);
    pt.x = random(maxsize, winx-maxsize);
    pt.y = random(maxsize, winy-maxsize);
    background(0);
    stroke(255);
    fill(255);
}

function draw() {
    background(0);
    strokeWeight(0);
    fill(255);
    stroke(255);
    
    pt.distp = dist(mouseX, mouseY, pt.x, pt.y);
    fill(pt.distp < mindist ? map(pt.distp, mindist, 0, 0, 255) : 0);
    ellipse(pt.x, pt.y, pt.distp < mindist ? map(pt.distp, mindist, 0, 0, maxsize) : 0, pt.distp < mindist ? map(pt.distp, mindist, 0, 0, maxsize) : 0);

    if (looking && pt.distp < mindist && dist(mouseX, mouseY, pt.x, pt.y) < 20) {
        foundpt.push({x: pt.x, y: pt.y, rad: maxsize, fil: 255});
        pt.x = random(maxsize, winx-maxsize);
        pt.y = random(maxsize, winy-maxsize);
        cooldown = 70;
        score++;
        looking = false;
    }
    
    if (foundpt.length > 0) {
        for (i = foundpt.length-1; i>=0; i--) {
            fill(foundpt[i].fil);
            ellipse(foundpt[i].x, foundpt[i].y, foundpt[i].rad, foundpt[i].rad);
            foundpt[i].rad += 1;
            foundpt[i].fil -= 8;
        if (foundpt[i].rad >= 120) {
            foundpt.splice(i, 1);
        }
        }
    }
    
    if (!looking && cooldown > 0) {
        --cooldown;
        if (cooldown < 1) {
            --cooldown;
            looking = true;
        }
    }
    
    $(function () {
       $("#score").html("found " + score);
       $("#score").mouseover(function() {
           $(this).css("opacity", "0.3");
       });
       if (count > 1) {
           if (mouseX  > winx*0.25 || mouseY > winy*15) {
               $("#score").css("opacity", "1");
           }
       } else {
       if (mouseX > winx*0.25 || mouseY < winy*0.85) { 
           $("#score").css("opacity", "1");
       }
       }
    });
}
    
function mousePressed() {
$(function () {
    count++;
    $("#instruct").animate({top : "-20vh", opacity : "0"}, 800);
    $("#score").animate({top : "7vh"}, 1200);
});
}