window.onload = function () {
	let canvas = document.getElementById('solar-canvas');
	let context = canvas.getContext('2d');

	if (!canvas) {
		alert("Impossible to get canvas");
		return;
	}

	if (!context) {
		alert("Impossible to get canvas context");
		return;
	}

	class Star {
		constructor(name, color, radius, x, y) {
			this.name = name;
			this.color = color;
			this.radius = radius;
			this.x = x;
			this.y = y;
		}

		draw() {
			context.beginPath();
			context.fillStyle = this.color;
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			context.fill();
			context.closePath();
		}
}

	class Planet {
		constructor(name, color, radius, distScale, revRatio, star) {
			this.name = name;
			this.color = color;
			this.radius = radius;
			this.distScale = distScale;
			this.parentStar = star
			this.x = this.parentStar.x + this.distScale;
			this.y = this.parentStar.y;
			this.revRatio = revRatio;
			this.angle = 0;
		}

		update() {
			this.angle += this.revRatio;
			this.x = this.parentStar.x + this.distScale * Math.sin(this.angle);
			this.y = this.parentStar.y + this.distScale * Math.cos(this.angle);
		}

		draw() {
			context.beginPath();
			context.fillStyle = this.color;
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			context.fill();
			context.closePath();
		}
	}

	let sun = new Star("Sun", "yellow", 40, canvas.width/2, canvas.height/2);
	let mercury = new Planet("Mercury", "white", 1.85, 59, 0.055, sun);
	let venus = new Planet("Venus", "#DE5F25", 4.85, 90, 0.022, sun);
	let earth = new Planet("Earth", "blue", 5.10, 110, 0.013, sun);
	let mars = new Planet("Mars", "red", 3, 140, 0.006, sun);
	let jupiter = new Planet("Jupiter", "orange", 20.42, 220, 0.0015, sun);
	let saturn = new Planet("Saturn", "#A88B6D", 17.23, 320, 0.0010, sun);
	let uranus = new Planet("Uranus", "#9FC4CA", 7.30, 400, 0.0003, sun);
	let neptune = new Planet("Neptune", "#3454DF", 7.07, 450, 0.0006, sun);

	let planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
	let stars = [sun];

	function mainUpdate() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		stars.forEach(function(star) {
			star.draw();
		});

		planets.forEach(function(planet) {
			planet.update();
			planet.draw();
		});

		window.requestAnimationFrame(mainUpdate);
	};

	window.requestAnimationFrame(mainUpdate);
}