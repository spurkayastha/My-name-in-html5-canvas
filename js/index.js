window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     ||  
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();
/*Define Global Variabls */
var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var w = 1700, h = window.outerHeight;
canvas.width = w;
canvas.height = h;
var counter = 0;
var counter2 = 0;
var add_color = false;

var particles = [];
//For those interested in how the array below generates the letters: [number of particles, min x coord, max x coord, min y coord, max y coord];
var c = [17,130,220,100,120, //S
         10,120,170,125,140,
         17,100,140,145,160,
         18,120,170,165,180,
         18,150,200,185,200,
         16,185,220,215,230,
         28,120,220,235,250,
         10,90,145,255,270,
         25,300,370,100,120, 
         
         
         //A
         10,280,320,125,150,
         10,370,390,125,140,
         10,260,280,145,150,
         6,260,280,160,180,
         6,260,280,195,210,
         6,260,280,225,240,
         6,260,280,250,270,
         6, 370,390, 160,180,
         6,370, 390, 195,210,
         6, 370, 390, 225, 240,
         6, 370, 390, 250, 270,
         14, 290, 360, 190,210,
         
         //Y
          6 , 420,440, 105,115,
         6, 440, 460, 120, 135,
         6, 465, 480, 137, 150,
         6, 482, 500, 151, 170,
         6 , 505, 520, 137, 150,
         6, 525, 540, 120, 135,
         6, 545, 570, 105, 115,
         25, 490,500 , 170, 270,
         
         
       
         //A
         
         6, 670, 690, 105,115,
         6, 690, 710, 120, 135,
         6, 715, 730, 137, 150,
         25, 715, 730, 160, 270,
         6, 650, 670, 120, 135,
         6, 630, 650, 137, 150,
         25, 630, 650, 160, 270,
         7, 650, 715, 195,200,
         
         
         
         //N
         35, 800, 810, 105, 270,
         9, 820, 850, 110, 130,
         9, 850, 890, 140, 200,
         9, 900, 940, 200, 270,
         30, 940,955, 105, 270,
         
         
         //T
         35, 1000,1200, 105,130,
         35, 1090, 1110, 110, 270,
         
         //A
         6, 1350, 1370, 105,115,
         6, 1371, 1390, 120, 135,
         6, 1395, 1410, 137, 150,
         25, 1395, 1410, 160, 270,
         6, 1330, 1310, 120, 135,
         6, 1311, 1290, 137, 150,
         25, 1289,1270, 160, 270,
         12, 1290,1392,  195, 200,
         
         
         //N
         35, 1450,1460, 105,270,
         9, 1470, 1500, 110,130,
         12, 1501, 1550, 140,200,
         9, 1555, 1590, 200, 270,
         30, 1590, 1605, 105, 270,
         
         
        ];
         
         function init(){
         counter = 0;
         counter2 = 0;
         particles = [];
reset_scene();
for(var i=0;i<c.length;i+=5){
  for(var k=0;k<c[i];k++){
    var p = new particle(c[1+i],c[2+i],c[3+i],c[4+i]);
    particles.push(p);
  }
}
}

function change_color(){
  add_color = !add_color;
  if(add_color == true){
    $("input").val("Remove Color");
  }
  else{
    $("input").val("Add Color");
  }
  init();
}

function reset_scene(){
  if(add_color == false){
    ctx.fillStyle = "#212121";
    $("body").css("background","#212121");
  }
  else{
    ctx.fillStyle = "#ffffff";
    $("body").css("background","#ffffff");
  }
  ctx.fillRect(0,0,w,h);
}

function drawscene(){
  counter++;
  reset_scene();
  for(var i=0;i<particles.length;i++){
    var p = particles[i];
    //calc diff from curr to final
    if(counter < 250){
      var dX = p.fx - p.x;
      var dY = p.fy - p.y;
      var dist = Math.sqrt(dX*dX + dY*dY);
      
      if(dist<=10){
        p.vx = 0;
        p.vy = 0;
        p.ex = false;
      }
      else{
        if(dX == dY){
          
        }
        if(dY < 0){
          dY = -dY;
        }
        p.vy = dY*0.03;
        
        if(dX < 0){
          dX = -dX;
        }
        p.vx = dX*0.03;
        
      }
      
      
      if(p.x > p.fx){
        p.x -= p.vx
      }
      else{
        p.x += p.vx
      }
      
      if(p.y > p.fy){
        p.y -= p.vy
      }
      else{
        p.y += p.vy
      }
      
      p.draw();
    }
    else{
      counter2++;
      if(counter2>100000){
        counter = 0;
        counter2 = 0;
      }
      var dX = p.x - p.ox;
      var dY = p.y - p.oy;
      var dist = Math.sqrt(dX*dX + dY*dY);
      
      if(dist<=10){
        p.vx = 0;
        p.vy = 0;
        p.ex = true;
      }
      else{
        if(dX == dY){
          
        }
        if(dY < 0){
          dY = -dY;
        }
        p.vy = dY*0.03;
        
        if(dX < 0){
          dX = -dX;
        }
        p.vx = dX*0.03;
        
      }
      
      
      if(p.x > p.ox){
        p.x -= p.vx
      }
      else{
        p.x += p.vx
      }
      
      if(p.y > p.oy){
        p.y -= p.vy
      }
      else{
        p.y += p.vy
      }
      
      p.draw();
    }
  }
}

function particle(x1,x2,y1,y2){
  this.ox = Math.random()*w;
  this.oy = Math.random()*h;
  this.x = this.ox;
  this.y = this.oy;
  this.ex = true; //this particle is in exploded state
  //Final Position COORDS
  var maxx = x1;
  var minx = x2;
  this.fx = Math.floor(Math.random()*(maxx-minx+1)+minx);
  var maxy = y1;
  var miny = y2;
  this.fy = Math.floor(Math.random()*(maxy-miny+1)+miny);
  
  this.vx = 5;
  this.vy = 5;
  var max = 10;
  var min = 1;
  this.r = Math.floor(Math.random()*(max-min+1)+min);
  if(add_color == true){
    var max = 255;
    var min = 0;
    this.hue = Math.floor(Math.random()*(max-min+1)+min);
  }
  
  this.draw = function(){
    if(add_color == false){
      ctx.fillStyle = "rgba(255,255,255,0.4)";
    }
    else{
      ctx.fillStyle = 'hsla('+this.hue+', 100%, 40%, 0.4)';
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
    ctx.fill();
  }
}

function animloop() {
  drawscene();
  requestAnimFrame(animloop); 
}
init();
animloop();