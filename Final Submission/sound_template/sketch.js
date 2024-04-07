/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var gameChar_world_x;

var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting;
var isFound = false;
var isReached = false;

var collectable;
var hearts;
var x_pos;
var y_pos;
var size;

var canyon;
var mountain;
var sun;

var trees_x =[200,400,1200,1400];
var mountain_x =[200,500,800,1100,1400];
var treePos_y;
var clouds = [50,150,200];
var cloudPos_y;
var canyonX = [70,600,800,1000,1200];


var canyonY;

var scrollPos;

var game_score;
var flagpole;
var lives;

var platforms;


var jumpSound;
var backgroundSound;
var collectableSound;

var mode;
var enemies;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
	//jump sound
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.2);

    // background sound
	backgroundSound = loadSound('assets/blast-138451.mp3');
	backgroundSound.setVolume(0.1);
	
	// collectable sound 
	collectableSound = loadSound('assets/scale-e6-14577.mp3');
	collectableSound.setVolume(0.2);

	


}

function setup()
{
	createCanvas(1024, 576);
    createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	lives = 3;

	mode = 0;

	startGame();

	backgroundSound.play();
	backgroundSound.loop();


}

function startGame()
{
	
	
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	collectable =  [{x_pos: 40, y_pos:floorPos_y-10,isFound: false},
		            {x_pos: 60, y_pos:floorPos_y-10,isFound: false},
					{x_pos: 220,y_pos:floorPos_y-10,isFound: false},
					{x_pos: 240, y_pos:floorPos_y-10,isFound:false},
		            {x_pos: 550, y_pos:floorPos_y-10,isFound: false},
				    {x_pos: 570, y_pos:floorPos_y-10,isFound: false},
				    {x_pos: 750, y_pos:floorPos_y-10,isFound: false},
				    {x_pos: 770, y_pos:floorPos_y-10,isFound:false},
				    {x_pos: 920, y_pos:floorPos_y-10,isFound: false},
				    {x_pos: 970, y_pos:floorPos_y-10,isFound: false}];
	
	hearts = [{x_pos: 590,y_pos: floorPos_y-10,isFound:false},
	          {x_pos: 720,y_pos:floorPos_y-10,isFound:false},
			  {x_pos: 950,y_pos:floorPos_y-10,isFound:false}];
	

	canyon = {x_pos:70, y_pos:floorPos_y, width: 100};
	sun = {x_pos: 200, y_pos:100, size: 40};
	treePos_y = floorPos_y;
	cloudPos_y = 100;
	canyonY = floorPos_y;
    isPlummeting = false;
    
	platforms = [];

	platforms.push(createPlatforms(500,floorPos_y-100,90));
	platforms.push(createPlatforms(700,floorPos_y-150,200));
	game_score = 0;
	flagpole = {isReached: false, x_pos: 1500};

	enemies = [];
	enemies.push(new Enemies(750,floorPos_y-10,50));
	

}

function draw()
{

	///////////DRAWING CODE//////////
	if(mode==0)
	{
		push();
	    fill(0,0,0,200);
	    rect(0,0,width,height);

	    fill(0,100,0);
	    textSize(20);
	    textFont("Century Gothic");
	    text("PRESS ENTER TO START", width/2-200,height/2);
    
	    pop();
	}
	
	if(mode == 1)
	{
		scrollPos = gameChar_x - width / 2;
	
		background(100,155,255); //fill the sky blue
	
	
		noStroke();
		fill(0,155,0);
		rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
		push();
		translate(-scrollPos,0);
		drawMountain();
		drawTrees();
		drawSun();
		drawClouds();
		drawCanyon();
		// platform
	
		for(var i = 0;i < platforms.length;i++)
		{
			platforms[i].draw();
		}
		//collectable
		for(var i = 0; i < collectable.length; i++)
		{
			if(collectable[i].isFound == false) 
			{
				drawCollectables(collectable[i]);
				checkCollectables(collectable[i]);
				
			}
		}
	
		//life tokens
		for(var i = 0;i < hearts.length;i++)
		{
			if(hearts[i].isFound == false)
			{
				drawLifeToken(hearts[i]);
				checkLifeToken(hearts[i]);
			}
			
		}
	   //the game character
		if(isLeft && isFalling)
		{
			// add your jumping-left code
			fill(210,105,30);
			ellipse(gameChar_x, gameChar_y -70, 20,40);
			
			// body
			fill(128,128,0);
			rect(gameChar_x-10,gameChar_y-55,20,30);
			
			 // legs
			fill(0);
			ellipse(gameChar_x, gameChar_y-20,5,10);
	
		}
		else if(isRight && isFalling)
		{
			// add your jumping-right code
			fill(210,105,30);
			ellipse(gameChar_x, gameChar_y -70, 20,40);
		
		   // body
		   fill(128,128,0);
		   rect(gameChar_x-10,gameChar_y-55,20,30);
		
		   // legs
		   fill(0);
		   ellipse(gameChar_x, gameChar_y-20,5,10);
	
		}
		else if(isLeft)
		{
			// add your walking left code
			fill(210,105,30);
			ellipse(gameChar_x, gameChar_y - 50, 20,40);
			
			// body
			fill(128,128,0);
			rect(gameChar_x-10,gameChar_y-35,20,30);
			
			// legs
			fill(0);
			ellipse(gameChar_x, gameChar_y,5,10);
	
		}
		else if(isRight)
		{
			 // head
			 fill(210,105,30);
			 ellipse(gameChar_x, gameChar_y - 50, 20,40);
			 
			 // body
			 fill(128,128,0);
			 rect(gameChar_x-10,gameChar_y-35,20,30);
			 
			  // legs
			 fill(0);
			 ellipse(gameChar_x, gameChar_y,5,10);
	
		}
		else if(isFalling || isPlummeting)
		{
			fill(210,105,30);
			ellipse(gameChar_x, gameChar_y - 70, 35);
		
		   // body
		   fill(128,128,0);
		   rect(gameChar_x-15,gameChar_y-55,30,30);
		
		   // legs
		   fill(0);
		   ellipse(gameChar_x-15,gameChar_y-25,10);
		
		   fill(0);
		   ellipse(gameChar_x+15, gameChar_y-25,10);
	
		}
		else
		{
			// head 
			fill(210,105,30);
			ellipse(gameChar_x, gameChar_y - 50, 35);
			
			// body
			fill(128,128,0);
			rect(gameChar_x-15,gameChar_y-35,30,30);
			
			// legs 
			fill(0);
			ellipse(gameChar_x-15,gameChar_y-5,10);
			
			fill(0);
			ellipse(gameChar_x+15, gameChar_y-5,10);
	
		}
		renderFlagPole();

		for(var i = 0; i < enemies.length; i++)
		{
			enemies[i].draw();

			var isContact = enemies[i].checkContact(gameChar_x,gameChar_y);

			if(isContact)
			{
				if(lives>0)
				{
					startGame();
					break;
				}
			}
		}
	
		pop();
	
	
		
	
		
	   // moving the game character
		if(isLeft == true)
		{
			gameChar_x -= 3; 
		}
	
		if(isRight == true) 
		{
			gameChar_x += 3;
		}
	
		if(gameChar_y < floorPos_y)
		{   
			for(var i = 0;i < platforms.length;i++)
			{
				var isContact = false;
				if(platforms[i].checkContact(gameChar_x,gameChar_y))
				{
					isContact = true;
					isFalling = false;
					break;
				}
			}
			if(isContact == false)
			{
			  gameChar_y += 3;
			  isFalling = true;
			}
		}
		else
		{
			isFalling = false;
		}
	
		if(flagpole.isReached == false)
		{
			checkFlagPole();
		}
		
		//gameChar_world_x = gameChar_x - scrollPos;
	
		fill(255);
		noStroke();
		textFont("Century Gothic");
		text("SCORE: " + game_score, 20,20);
	
		fill(255);
		textFont("Century Gothic");
		text("LIVES: " + lives, 600,20);
	
		checkPlayerDie();

	}
	


}



function keyPressed()
{
    // if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if(keyCode == 37)
	{
		console.log("left arrow");
		isLeft = true;
	}
	else if(keyCode == 39)
	{
		console.log("right arrow")
		isRight = true;
	}
	if(key == 'a')
	{
		isLeft = true;
	}

    if(key == 'd')
	{
		isRight = true;
	}

	if(key == 'w')
	{
		if(isFalling == false)
		{
			gameChar_y -= 100;
            jumpSound.play();
		}
		
	}
	if(isPlummeting == false && key == 'w')
	{
	    isFalling = false;
		if(isFalling == false)
		{
			gameChar_y -= 100;
		}
	}
	if(keyCode == 32)
	{
		setup();
	}

	if(keyCode == 13)
	{
		mode = 1;
	}
    
    
    
}

function keyReleased()
{
	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
	// if statements to control the animation of the character when
	// keys are released.
	if(keyCode == 37)
	{
		console.log("left arrow");
		isLeft = false;
	}
	else if(keyCode == 39)
	{
		console.log("right arrow")
		isRight = false;
	}
	
	if(key == 'a')
	{
		isLeft = false;
	}
	

    if(key == 'd')
	{
		isRight = false;
	}

}

function drawClouds()
{
	// clouds
	for(var i = 0; i < clouds.length; i++)
	{
		fill(255);
		ellipse(clouds[i]+100,cloudPos_y + 100,60);
		ellipse(clouds[i]+130,cloudPos_y + 100,40);
		ellipse(clouds[i]+300, cloudPos_y +50,60);
		ellipse(clouds[i]+330,cloudPos_y+50,40);
		
	}
	

}

function drawCollectables(t_collectable)
{
		  fill(233,173,3);
		  ellipse(t_collectable.x_pos,t_collectable.y_pos,10,10);
}

function checkCollectables(t_collectable)
{
	
		if(dist(gameChar_x, gameChar_y, t_collectable.x_pos,t_collectable.y_pos) < 30)
	         {
				collectableSound.play();
		        t_collectable.isFound = true;
				game_score += 1;
	         }

}

function drawCanyon()
{
	
	for(var i = 0; i < canyonX.length; i++)
	{
		
		fill(43,101,236);
	    rect(canyonX[i],canyonY,100,200);
		if((gameChar_x > canyonX[i] && gameChar_x < canyonX[i] + 100) && gameChar_y >= floorPos_y)
	       {
		      isPlummeting = true;
		      gameChar_y += 2;
			 
	       }
	    if(isPlummeting == true)
	      {
		    isLeft = false;
		    isRight = false;
		
	      }
	}

}

function drawMountain()
{
	for(var j = 0; j < mountain_x.length; j++)
	{
		// mountain 
	   fill(128,128,128);
	   triangle(mountain_x[j] + 300, treePos_y - 232,
	 	     mountain_x[j] + 400, treePos_y,
	 		 mountain_x[j] + 150, treePos_y);

	}

}

function drawTrees()
{
	for(var i = 0; i < trees_x.length; i++)
	{
			 
		fill(140,98,88);
		rect(trees_x[i],treePos_y-150,60,150);
		fill(58,95,11);
		triangle(trees_x[i]-50,treePos_y-150,trees_x[i]+30,treePos_y-200,trees_x[i]+110,treePos_y-150);
		triangle(trees_x[i]-50,treePos_y-100,trees_x[i]+30,treePos_y-200,trees_x[i]+110,treePos_y-100);
			
	}


}

function drawSun()
{
	noStroke();
	 fill(255,215,0);
     ellipse(sun.x_pos,sun.y_pos,sun.size + 40);

}

function renderFlagPole()
{
	push();
	strokeWeight(5);
	stroke(80);
	line(flagpole.x_pos,floorPos_y,flagpole.x_pos,floorPos_y-250);
	fill(220,20,60);
	noStroke();

	if(flagpole.isReached)
	{
	    rect(flagpole.x_pos,floorPos_y-250,50,50);
      
	}
	else
	{
		rect(flagpole.x_pos,floorPos_y-50,50,50);

	}
	pop();
}

function checkFlagPole()
{
	var d = abs(gameChar_x - flagpole.x_pos);

    if(d < 15)
	{
	    flagpole.isReached = true;
	}

}

function checkPlayerDie()
{
	push();
	if(lives > 0 && gameChar_y > height)
	{
		lives -= 1;
         startGame();
	}

	if(lives < 1)
	{
		endGame();
	}
	else if(flagpole.isReached == true)
	{
		fill(0,0,0,200);
		rect(0,0,width,height);
		fill(148,0,211);
		textSize(50);
		text("YAYYY YOU DID IT", width/2-200,height/2);

	}
	pop();
	
}

function endGame()
{
	push();
	fill(0,0,0,200);
	rect(0,0,width,height);

	fill(0,100,0);
	textSize(20);
	textFont("Century Gothic");
	text("SORRY YOU TRIED .. BIG WHOMP", width/2-200,height/2);
    fill(255);
	textSize(20);
	text("PRESS SPACE IF YOU WANT TO GO AGAIN", width/2-200,310);
	pop();
	
}

function drawLifeToken(t_hearts)
{
   fill(221,160,221);
   ellipse(t_hearts.x_pos,t_hearts.y_pos,15);
}

function checkLifeToken(t_hearts)
{
	if(dist(gameChar_x, gameChar_y, t_hearts.x_pos,t_hearts.y_pos) < 30)
	{
		t_hearts.isFound = true;
		lives += 1;
	}
	    
			
	         


}

function createPlatforms(x,y,length)
{
	var p = {
		x: x,
		y: y,
		length: length,
		draw: function()
		{
            fill(160,82,45);
			rect(this.x,this.y,this.length,20,40);
		},

		checkContact: function(gc_x,gc_y)
		{
			if(gc_x > this.x && gc_x < this.x + this.length)
			{
				var d = this.y - gc_y;
				if(d >= 0 && d < 3)
				{
					return true;
				}
				//console.log("working");
			}
		
		return false;
		}

	}

	return p;
}

function Enemies(x,y,range)
{
	this.x = x;
	this.y = y;
	this.range = range;

	this.currentX = x;
	this.inc = 1;

	this.update = function()
	{
		this.currentX += this.inc;

		if(this.currentX >= this.x + this.range)
		{
			this.inc = -1;
		}
		else if(this.currentX < this.x)
		{
			this.inc = 1;
		}

	}

	this.draw = function()
	{
		this.update();
		fill(184,134,11);
		rect(this.currentX,this.y-30,10,30);
		ellipse(this.currentX+5,this.y-30,20);
		ellipse(this.currentX,this.y,10);
		ellipse(this.currentX+10,this.y,10);

	}

	this.checkContact = function(gc_x,gc_y)
	{
		var d = dist(gc_x,gc_y,this.currentX,this.y);

		if(d < 20)
		{
			return true;
		}
		return false;

	}
}

/*  This project was inspired by a little game I used to play when I was younger when we had only one cellphone in the house. Although this project doesn't do it justice, I am very proud I was able to do this project on my own.
This project follows a little train characteer jumping over canyons in a mountainlike scene. it took about six months to complete and it has a special place in my heart as a novice programmer.
I used sound extensions in creating a gaming feel when using the character. The character was inspired by little sister who really like trains. 
The sound extensions used as seen in the project are the jump sound,the collectable soud and also the background sound. In terms of user interaction, I created a page that allows the user to enter to start and space to try again. This creates the early 2000s mobile games that was played with phones that had buttons.
Lastly as a new programmer I had several challenges. I had a lot of help from youtube and slack overflow to help fix the many errors I had whiles working on this project. I had to research things I didn't understand until I got them and this meant a lot of added work was done on this project.
Thank you */


